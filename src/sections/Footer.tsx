import React from "react";
import { Linkedin, Twitter, Github, Globe, Phone, MapPin, Mail } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const footerLinksModel = [
    {
      title: "footer.col1",
      items: [
        { nameKey: "footer.link.stock", href: "#features" },
        { nameKey: "footer.link.sales", href: "#features" },
        { nameKey: "footer.link.accounting", href: "#features" },
        { nameKey: "footer.link.ai", href: "#features" },
        { nameKey: "footer.link.plans", href: "#pricing" }
      ]
    },
    {
      title: "footer.col2",
      items: [
        { nameKey: "footer.link.about", href: "#why-choose-us" },
        { nameKey: "footer.link.why", href: "#why-choose-us" },
        { nameKey: "footer.link.demo", href: "#demo" },
        { nameKey: "footer.link.testimonials", href: "#testimonials" },
        { nameKey: "footer.link.jobs", href: "#contact" }
      ]
    },
    {
      title: "footer.col3",
      items: [
        { nameKey: "footer.link.api", href: "#demo" },
        { nameKey: "footer.link.blog", href: "#faq" },
        { nameKey: "footer.link.support", href: "#faq" },
        { nameKey: "footer.link.status", href: "#demo" },
        { nameKey: "footer.link.contact", href: "#contact" }
      ]
    },
    {
      title: "footer.col4",
      items: [
        { nameKey: "footer.link.terms", href: "#pricing" },
        { nameKey: "footer.link.gdpr", href: "#pricing" },
        { nameKey: "footer.link.cookies", href: "#pricing" },
        { nameKey: "footer.link.legal", href: "#pricing" }
      ]
    }
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200/50 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 md:gap-12 mb-16">
          
          {/* Logo & Corporate block */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" onClick={handleScrollToTop} className="flex items-center gap-2 group cursor-pointer inline-flex">
              <img
                src="/logo.png"
                alt="ATIF AI"
                className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            <p className="text-xs md:text-sm font-normal leading-relaxed text-slate-500 dark:text-slate-400">
              {t("footer.desc")}
            </p>

            {/* Social channels anchors */}
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-blue-650 dark:hover:text-cyan-405 transition-colors cursor-pointer"
                aria-label="Profil Twitter"
              >
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-blue-650 dark:hover:text-cyan-405 transition-colors cursor-pointer"
                aria-label="Profil LinkedIn"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-blue-650 dark:hover:text-cyan-405 transition-colors cursor-pointer"
                aria-label="Profil Github"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Dynamic Link columns mapping */}
          {footerLinksModel.map((column) => (
            <div key={column.title} className="space-y-4">
              <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-900 dark:text-white font-sans">
                {t(column.title)}
              </h4>
              <ul className="space-y-3.5">
                {column.items.map((item) => (
                  <li key={item.nameKey}>
                    <a
                      href={item.href}
                      className="text-xs sm:text-sm font-normal text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-405 transition-colors"
                    >
                      {t(item.nameKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Lower footer: Corporate credits */}
        <div className="pt-8 border-t border-slate-200/50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 dark:text-slate-500">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span>
              &copy; {currentYear} ATIF AI Business. {t("footer.rights")}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-800">|</span>
            <span>
              {t("footer.hosted")}
            </span>
          </div>

          <div className="flex items-center gap-1 font-sans font-medium text-slate-400 dark:text-slate-500">
            <Globe className="h-4 w-4" />
            <span>{t("footer.lang")}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
