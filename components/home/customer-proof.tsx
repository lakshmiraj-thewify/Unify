export function CustomerProof() {
  const stats = [
    { value: '200+', label: 'Active ISPs & WISPs', subtext: 'Running in production across India' },
    { value: '50,000+', label: 'Subscribers Managed', subtext: 'PPPoE & Hotspot active sessions' },
    { value: '99.99%', label: 'Cloud RADIUS Uptime SLA', subtext: 'High-availability geo-redundant cluster' },
    { value: '10 min', label: 'MikroTik Setup Time', subtext: 'Zero firmware changes or scripts' },
  ]

  const stories = [
    {
      operatorType: 'Wireless ISP (WISP)',
      badge: 'Fixed Wireless',
      title: 'Managing 1,800+ outdoor subscribers with zero on-premise server maintenance',
      quote:
        'We previously ran FreeRADIUS on a local Ubuntu box. Power surges or battery drains in the server room would drop customer sessions. Switching to Unify gave us 99.99% uptime and zero server upkeep.',
      location: 'Andhra Pradesh, India',
      tags: ['MikroTik CCR1009', 'PPPoE Sessions', 'Dynamic CoA'],
    },
    {
      operatorType: 'Local Cable Operator (LCO)',
      badge: 'White-Label Portal',
      title: 'Expanded into 4 franchise territories using isolated partner portals',
      quote:
        'Our LCO partners have their own login and branding to collect payments from their subscribers. They cannot touch our main router or see each other’s subscriber numbers. It solved our partner trust issue completely.',
      location: 'Telangana, India',
      tags: ['Branded Domain', 'Automated GST', 'UPI Auto-Pay'],
    },
    {
      operatorType: 'Fiber Broadband ISP',
      badge: 'High-Speed FTTH',
      title: 'Automated 80% of renewal follow-ups through WhatsApp payment links',
      quote:
        'Instead of three staff members calling subscribers every morning to renew expired plans, WhatsApp alerts with UPI links go out automatically 3 days prior. Subscribers renew on GPay in 30 seconds.',
      location: 'Maharashtra, India',
      tags: ['WhatsApp Business', 'Razorpay', 'Zero Manual Follow-ups'],
    },
  ]

  return (
    <section className="unify-light-section py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading on Clean White */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-semibold text-[#743CFF] tracking-wider uppercase mb-4">
            Proven At Scale
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            What leading ISP operators achieve with Unify
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Built specifically for independent broadband operators, WISPs, and multi-tenant LCO networks.
          </p>
        </div>

        {/* 4 Big Metrics Grid on White */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-300 transition-all text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-[#743CFF] mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Customer Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-[#743CFF]">
                    {story.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {story.operatorType}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  &ldquo;{story.title}&rdquo;
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed italic">
                  {story.quote}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {story.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  📍 {story.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
