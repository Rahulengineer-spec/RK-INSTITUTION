"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { AuthMFAEnrollResponse, Factor } from '@supabase/supabase-js'

export function MfaSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [factors, setFactors] = useState<Factor[]>([])
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [verifyCode, setVerifyCode] = useState('')

  useEffect(() => {
    loadFactors()
  }, [])

  const loadFactors = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.listFactors()
      if (error) throw error
      setFactors(data?.all || [])
    } catch (err) {
      setError('Failed to load MFA factors')
      console.error(err)
    }
  }

  const handleEnableMfa = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      const { data, error }: AuthMFAEnrollResponse = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      })
      
      if (error) throw error
      
      const isTotpFactor = (data: any): data is { type: 'totp'; totp: { qr_code: string; secret: string; uri: string } } => {
        return data?.type === 'totp' && data?.totp?.qr_code && data?.totp?.secret;
      };
      
      if (!data || !isTotpFactor(data)) throw new Error('No TOTP data received')

      setQrCode(data.totp.qr_code)
      setSecret(data.totp.secret)
      setSuccess('Scan the QR code with your authenticator app')
    } catch (err) {
      setError('Failed to enable MFA')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const totpFactor = factors.find(f => f.factor_type === 'totp')
      if (!totpFactor) throw new Error('No TOTP factor found')
      const { id: factorId } = totpFactor
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId
      })
      if (challengeError) throw challengeError
      if (!challengeData?.id) throw new Error('No challengeId returned')

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code: verifyCode
      })
      
      if (verifyError) throw verifyError

      setSuccess('MFA verified successfully')
      setQrCode(null)
      setSecret(null)
      setVerifyCode('')
      await loadFactors()
    } catch (err) {
      setError('Failed to verify MFA code')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisableMfa = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const totpFactor = factors.find(f => f.factor_type === 'totp')
      if (!totpFactor) throw new Error('No TOTP factor found')
      const { id: factorId } = totpFactor
      const { error } = await supabase.auth.mfa.unenroll({
        factorId
      })
      if (error) throw error

      setSuccess('MFA disabled successfully')
      await loadFactors()
    } catch (err) {
      setError('Failed to disable MFA')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
      
      {error && (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {factors.length === 0 ? (
        <div className="space-y-4">
          <p>Enhance your account security by enabling two-factor authentication.</p>
          <Button onClick={handleEnableMfa} disabled={isLoading}>
            {isLoading ? 'Enabling...' : 'Enable 2FA'}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p>Two-factor authentication is enabled.</p>
          <Button onClick={handleDisableMfa} variant="destructive" disabled={isLoading}>
            {isLoading ? 'Disabling...' : 'Disable 2FA'}
          </Button>
        </div>
      )}

      {qrCode && (
        <div className="space-y-4">
          <div className="max-w-xs">
            <img src={qrCode} alt="QR Code for 2FA" className="w-full" />
          </div>
          <p className="text-sm">Secret key: {secret}</p>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter verification code"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
            />
            <Button onClick={handleVerify} disabled={!verifyCode || isLoading}>
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </div>
      )}

      {/* Show TOTP details for enabled factors */}
      {factors
        .filter(f => f.factor_type === 'totp')
        .map((factor, idx) => {
          if (factor.factor_type === 'totp') {
            const totp = (factor as any).totp as { secret?: string; uri?: string } | undefined;
            return totp ? (
              <div key={factor.id} className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  TOTP Secret: {totp.secret}
                </div>
                <div className="text-xs text-muted-foreground">
                  TOTP URI: {totp.uri}
                </div>
              </div>
            ) : null;
          }
          return null;
        })}
    </div>
  )
} 