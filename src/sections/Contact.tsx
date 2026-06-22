import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ContactFormInput } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, CheckCircle2, ShieldCheck, Mail, Building, User } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "Le nom doit comporter au moins 2 caractères" })
    .max(50, { message: "Le nom ne peut pas dépasser 50 caractères" }),
  email: z.string()
    .email({ message: "Veuillez saisir une adresse e-mail valide (ex: nom@entreprise.com)" }),
  company: z.string()
    .min(2, { message: "Le nom de l'entreprise doit comporter au moins 2 caractères" }),
  message: z.string()
    .min(10, { message: "Votre message doit contenir au moins 10 caractères" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" })
});

export function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    // Simulate API request to backend
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-transparent transition-colors duration-300">
      {/* Glow shapes */}
      <div className="absolute top-1/4 left-10 w-[350px] h-[350px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/2 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200/30 mb-4">
            <span>{t("contact.title")}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight tracking-tight text-slate-900 dark:text-white">
            {t("contact.subtitle")}
          </h2>
          
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t("contact.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Left panel: Info & Values */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 shadow-xl shadow-blue-500/5 relative overflow-hidden backdrop-blur-xl">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-black font-sans text-slate-900 dark:text-white tracking-tight">
                  {t("contact.why_title")}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-normal">
                  {t("contact.why_desc")}
                </p>
              </div>

              {/* Promises checklist list */}
              <div className="space-y-6">
                <div className="flex gap-3.5">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-405 shrink-0 height-fit">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold dark:text-white text-slate-900">{t("contact.promise1_title")}</h4>
                    <p className="text-xs text-slate-400 mt-1">{t("contact.promise1_desc")}</p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 shrink-0 height-fit">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold dark:text-white text-slate-900">{t("contact.promise2_title")}</h4>
                    <p className="text-xs text-slate-400 mt-1">{t("contact.promise2_desc")}</p>
                  </div>
                </div>

                <div className="flex gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 height-fit">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold dark:text-white text-slate-900">{t("contact.promise3_title")}</h4>
                    <p className="text-xs text-slate-400 mt-1">{t("contact.promise3_desc")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick direct contact links */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 mt-8 text-xs text-slate-400 font-sans space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{t("contact.address_label")}</span> {t("contact.address")}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{t("contact.email_label")}</span> contact@atif.ai
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{t("contact.support_label")}</span> support@atif.ai
              </div>
            </div>
          </div>

          {/* Right panel: Live interactive validated form with React Hook Form and Zod */}
          <div className="lg:col-span-7 rounded-3xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 p-8 shadow-xl relative backdrop-blur-xl shadow-blue-500/5">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Name field */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      {t("contact.form.name")} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        placeholder="Atif Rakoto"
                        {...register("name")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.name
                            ? "border-rose-500 focus:ring-rose-500/25 bg-rose-50/5 dark:bg-rose-950/5 text-rose-900"
                            : "border-black/5 dark:border-white/10 text-slate-800 dark:text-white bg-white/15 dark:bg-black/20 focus:ring-blue-500/25 focus:border-blue-600 dark:focus:border-cyan-500 backdrop-blur-sm"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-500 font-bold flex items-center gap-1 font-sans">
                        ⚠️ {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      {t("contact.form.email")} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        id="email"
                        type="text"
                        placeholder="atif@entreprise.com"
                        {...register("email")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.email
                            ? "border-rose-500 focus:ring-rose-500/25 bg-rose-50/5 dark:bg-rose-950/5 text-rose-900"
                            : "border-black/5 dark:border-white/10 text-slate-800 dark:text-white bg-white/15 dark:bg-black/20 focus:ring-blue-500/25 focus:border-blue-600 dark:focus:border-cyan-500 backdrop-blur-sm"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-500 font-bold flex items-center gap-1 font-sans">
                        ⚠️ {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company field */}
                  <div>
                    <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      {t("contact.form.company")} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building className="h-4 w-4" />
                      </div>
                      <input
                        id="company"
                        type="text"
                        placeholder="VeloDrop SAS"
                        {...register("company")}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.company
                            ? "border-rose-500 focus:ring-rose-500/25 bg-rose-50/5 dark:bg-rose-950/5 text-rose-900"
                            : "border-black/5 dark:border-white/10 text-slate-800 dark:text-white bg-white/15 dark:bg-black/20 focus:ring-blue-500/25 focus:border-blue-600 dark:focus:border-cyan-500 backdrop-blur-sm"
                        }`}
                      />
                    </div>
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-rose-500 font-bold flex items-center gap-1 font-sans">
                        ⚠️ {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      {t("contact.form.msg")} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Bonjour, j'aimerais intégrer le module logistique d'ATIF AI avec notre ERP interne..."
                      {...register("message")}
                      className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.message
                          ? "border-rose-500 focus:ring-rose-500/25 bg-rose-50/5 dark:bg-rose-950/5 text-rose-900"
                          : "border-black/5 dark:border-white/10 text-slate-800 dark:text-white bg-white/15 dark:bg-black/20 focus:ring-blue-500/25 focus:border-blue-600 dark:focus:border-cyan-500 backdrop-blur-sm"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-500 font-bold flex items-center gap-1 font-sans">
                        ⚠️ {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-form"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl text-sm font-semibold text-white dark:text-slate-950 bg-blue-600 dark:bg-cyan-500 shadow-lg shadow-blue-500/10 hover:bg-blue-700 dark:hover:bg-cyan-400 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:translate-y-0 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t("contact.form.sending")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>{t("contact.form.send")}</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-500 dark:text-slate-500 font-normal leading-normal">
                    {t("contact.form.gdpr")}
                  </p>
                </motion.form>
              ) : (
                // Super friendly high-quality dynamic Success screen state representation
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="pt-10 pb-6 text-center space-y-6 flex flex-col items-center justify-center h-full min-h-[400px]"
                >
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 shadow-lg shadow-emerald-500/5 mb-3">
                    <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
                    <span className="absolute inset-0 rounded-full bg-emerald-500/10 blur-sm animate-ping opacity-60"></span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black font-sans text-slate-900 dark:text-white tracking-tight">
                      {t("contact.success_title")}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 font-normal max-w-md mx-auto leading-relaxed">
                      {t("contact.success_desc")}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 text-xs font-bold rounded-xl text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                  >
                    {t("contact.form.send_another")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
