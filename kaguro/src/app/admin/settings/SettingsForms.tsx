"use client";

import { useState } from "react";
import { Loader2, Check, Eye, EyeOff } from "lucide-react";
import { updateProfile, changePassword } from "./actions";

export default function SettingsForms({ name, email }: { name: string; email: string }) {
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <>
      {/* Profile Form */}
      <form
        action={async (formData) => {
          setProfileLoading(true);
          setProfileMsg(null);
          const result = await updateProfile(formData);
          if (result?.error) {
            setProfileMsg({ type: "error", text: result.error });
          } else {
            setProfileMsg({ type: "success", text: "Profile updated!" });
          }
          setProfileLoading(false);
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-600">Name</label>
          <input
            name="name"
            defaultValue={name}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-600">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={email}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        {profileMsg && (
          <p className={`text-sm ${profileMsg.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {profileMsg.type === "success" && <Check className="mr-1 inline h-4 w-4" />}
            {profileMsg.text}
          </p>
        )}
        <button
          type="submit"
          disabled={profileLoading}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-sky-500/100 disabled:opacity-50"
        >
          {profileLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Update Profile
        </button>
      </form>

      {/* Divider */}
      <hr className="my-6" />

      {/* Password Form */}
      <h2 className="mb-4 text-lg font-bold text-text-dark">Change Password</h2>
      <form
        action={async (formData) => {
          setPasswordLoading(true);
          setPasswordMsg(null);
          const result = await changePassword(formData);
          if (result?.error) {
            setPasswordMsg({ type: "error", text: result.error });
          } else {
            setPasswordMsg({ type: "success", text: "Password changed!" });
          }
          setPasswordLoading(false);
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-600">Current Password</label>
          <div className="relative">
            <input
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-bold text-gray-600">New Password</label>
          <div className="relative">
            <input
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {passwordMsg && (
          <p className={`text-sm ${passwordMsg.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {passwordMsg.type === "success" && <Check className="mr-1 inline h-4 w-4" />}
            {passwordMsg.text}
          </p>
        )}
        <button
          type="submit"
          disabled={passwordLoading}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-sky-500/100 disabled:opacity-50"
        >
          {passwordLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Change Password
        </button>
      </form>
    </>
  );
}
