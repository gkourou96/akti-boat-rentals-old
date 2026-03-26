"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FormState {
  fullName: string;
  preferredDate: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: FormState = {
  fullName: "",
  preferredDate: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
        setForm(initialForm);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    // CONTAINER:
    // Mobile: w-full (Responsive)
    // Desktop: w-[791px] (Fixed, preserved)
    <div className="flex w-full xl:w-197.75 shrink-0 flex-col items-start gap-8">
      {/* FORM CONTAINER */}
      {/* Background: #E3891F1A */}
      {/* UPDATED: Changed 'xl:h-88.25' to 'h-auto' so padding is never cut off */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full flex-col rounded-[14.83px] bg-[#E3891F1A] p-6 h-auto"
      >
        {/* ROW 1: Full Name & Preferred Date */}
        {/* Mobile: flex-col | Desktop: flex-row */}
        <div className="flex w-full flex-col xl:flex-row gap-5">
          {/* Full Name */}
          <div className="flex w-full xl:w-1/2 flex-col gap-1">
            {/* FIX: Added leading-[20px] to kill the 1px browser overflow */}
            <label className="font-ubuntu text-[14px] leading-5 font-medium text-[#0D4168]">
              Full Name <span className="text-[#E3891F]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              required
              // Focus ring updated to match new orange theme
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>

          {/* Preferred Date */}
          <div className="flex w-full xl:w-1/2 flex-col gap-1">
            {/* FIX: Added leading-[20px] */}
            <label className="font-ubuntu text-[14px] leading-5 font-medium text-[#0D4168]">
              Preferred Date
            </label>
            <input
              type="text"
              name="preferredDate"
              value={form.preferredDate}
              onChange={handleChange}
              placeholder="Enter Date"
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>
        </div>

        {/* ROW 2: Email & Phone */}
        {/* Mobile: flex-col | Desktop: flex-row */}
        <div className="mt-4 flex w-full flex-col xl:flex-row gap-5">
          {/* Email */}
          <div className="flex w-full xl:w-1/2 flex-col gap-1">
            {/* FIX: Added leading-[20px] */}
            <label className="font-ubuntu text-[14px] leading-5 font-medium text-[#0D4168]">
              Email <span className="text-[#E3891F]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>

          {/* Phone */}
          <div className="flex w-full xl:w-1/2 flex-col gap-1">
            {/* FIX: Added leading-[20px] */}
            <label className="font-ubuntu text-[14px] leading-5 font-medium text-[#0D4168]">
              Phone <span className="text-[#E3891F]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
              className="h-9.5 w-full rounded-md bg-white px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
            />
          </div>
        </div>

        {/* ROW 3: Messages */}
        <div className="mt-4 flex w-full flex-col gap-2">
          {/* FIX: Added leading-[20px] */}
          <label className="font-ubuntu text-[14px] leading-5 font-medium text-[#0D4168]">
            Messages <span className="text-[#E3891F]">*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your requirements, preferred boat type, number of guests, or any special requests..."
            required
            className="h-35 xl:h-17.5 w-full resize-none rounded-md bg-white p-2 px-5 font-open text-[16px] text-[#0D4168] placeholder-[#B8C0CC] outline-none transition-all focus:ring-1 focus:ring-[#E3891F]"
          ></textarea>
        </div>

        {/* Feedback messages */}
        {error && (
          <p className="mt-3 font-open text-[14px] text-red-600">{error}</p>
        )}
        {success && (
          <p className="mt-3 font-open text-[14px] text-green-700">
            Your message has been sent! We&apos;ll be in touch shortly.
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <div className="mt-4 flex w-full justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex h-8.75 w-35 items-center justify-center gap-2 rounded-full bg-[#E3891F] hover:bg-[#F2992F80] transition-colors duration-300 cursor-pointer px-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="font-ubuntu text-[18px] font-normal text-white leading-none">
              {loading ? "Sending…" : "Submit"}
            </span>
            {!loading && (
              <Image
                src="/icons/contact-arrow.svg"
                alt="Arrow icon"
                width={18}
                height={8}
                style={{ height: 'auto' }}
                className="block ml-2.5"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
