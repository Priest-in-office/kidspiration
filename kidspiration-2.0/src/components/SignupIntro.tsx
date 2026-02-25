export default function SignupIntro() {
  return (
    <div className="flex flex-col gap-8 lg:w-5/12 pt-4 overflow-hidden">
      <div className="space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
          For Adults
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-slate-50">
          Inspire the next{" "}
          <span className="text-primary relative inline-block">
            generation
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40"
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
          Join our community of parents, mentors, and spiritual leaders
          dedicated to guiding children on their journey.
        </p>
      </div>

      {/* Image Cards */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
          <img
            alt="Adult mentoring a child reading a book"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwzM2E0NPaDruD5nBcsQwdYwwCp4P4ljeorYwLU3A-5fHVXnazbjjp4vhsdvUE9eHvbjSYfIrPHHlyllT98QX9czMZ9o_3P3ednJ2UhDdaWzKY9QS_CxphhyanBBWgqwfeaKK6WQfcMaqjEpxsH_2KV02hH3cBo3lmA6Ewq14mj-7xMChIkY-0wOtoZx5hcuDqv0TYGWCHw6gPgqhJdQMz96IPducISeH38O1nKDfoC4xZXiET2W2y7N2OE2iITtfEQT9cX-7Bk6dV"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <span className="text-white font-bold text-sm">Mentorship</span>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group translate-y-8">
          <img
            alt="Group of diverse kids playing together outdoors"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNDQ7YPazIUD5AzN3KgHZPRFct_CFs2rMvsFchcCqMPxX2QkAim53iqt8tukvmTzVMMRCeClPTtFThk660ukFmiYg7hHC3tNBwPCk19fPpx24yrZL-1eiBkZIto7jBkGWosKxfFh3lux9olUQuUwnqkxJN5aJHYWcJPnUZIFCYzjbBffUtjP6Q_XSjoQ_X0yatZoVi4wNflk9VwNeFM3qcgJ9i9kh9NT3JWCVvbCttgoxMEyHBfE2ZdF35M4Rj3ItioBEWc2tDZ1_2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <span className="text-white font-bold text-sm">Community</span>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="flex items-center gap-4 mt-8 text-slate-500 dark:text-slate-400 text-sm">
        <div className="flex -space-x-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-slate-200 overflow-hidden bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD5KfYaxqJAx_uTFb7ycHcM8LLWgj-0BkSxgVlySkCRdhp96Wqbf9Y8n47yPCaeBF9SF6pu2BTfe9cEExzCvZcICwMv_HSLB_OPcHf8vZ7mF4x1nDNZOFMhcMq0d2gSCsIkbGrNpTdxlPztlNvfVmc6sT3L2eoR4xGc8_8uE3O3KS2pFZX4hJS9hwIgdTnyEwgVuevVLOruEADI7c1KWRAFiZT_8PRqDldUfLiWzvEkRn4ZiSlgg-SQBgM49udekdMlcrbGp0q8vpBm')",
            }}
          />
          <div
            className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-slate-200 overflow-hidden bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtHdAzAmt6pcZgdvHw6sXgXxvFun8PNjiLTYI2sPwByQrSH-jEjnSI-Ptl-k0ax4tFAbqZz2eg3ntaIu2CcyEBjlyBvRhLstm3RX9B16BA3M1wSy2ianuhkcvmGm3baxfhyDm4nqL7OHb1g3uwg_QN3WqMimQ7AJ4SHjcGOG08VMWgj81YjJkpFVBj0PmWMLjmbW9zzDhgpwhu2H3n-qs1y3ssR_24KtlFUlElW9U-QJUIU_ywhKx1u4rZTqphOxYV6IW_8iiu-2A3')",
            }}
          />
          <div
            className="w-8 h-8 rounded-full border-2 border-white dark:border-background-dark bg-slate-200 overflow-hidden bg-cover"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAe0J75fqkJcoWXc6KS-e8URMR7ixonO4fm8_dp9ARqUSZsx3IN-wnT-rwi7mg2Pex8upiq5l0HwDhxsMUvdzco2czF9xh_J-BMIv3QHD7VVg1HmyyLQsHV1Nj0mIIul_yjivvVFzzUncMIxc6Iywwx_HXqaloB3qzZc7qa-K_MjFtFrBwgF5x1_l1mVkkMRCabdLPW7MnSKogRLJQttqhFRHhcWsbFRtV6iUR1UC2reyo-qCr8n5gXf88pCoQbxZpzsHqH3KBFEA-a')",
            }}
          />
        </div>
        <p>Join 1,000+ mentors today</p>
      </div>
    </div>
  );
}
