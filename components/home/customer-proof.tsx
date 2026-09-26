export function CustomerProof() {
  const stats = [
    { value: '200+', label: 'Active ISPs & WISPs', subtext: 'Running in production across India' },
    { value: '50,000+', label: 'Subscribers Managed', subtext: 'PPPoE & Hotspot active sessions' },
    {
      value: '99.99%',
      label: 'Cloud RADIUS Uptime SLA',
      subtext: 'High-availability geo-redundant cluster',
    },
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
    <section className="unify-light-section border-b border-slate-200 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading on Clean White */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold tracking-wider text-[#743CFF] uppercase">
            Proven At Scale
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            What leading ISP operators achieve with Unify
          </h2>
          <p className="text-base text-slate-600 sm:text-lg">
            Built specifically for independent broadband operators, WISPs, and multi-tenant LCO
            networks.
          </p>
        </div>

        {/* 4 Big Metrics Grid on White */}
        <div className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
            >
              <div className="mb-2 font-mono text-3xl font-extrabold tracking-tight text-[#743CFF] sm:text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <div className="mb-1 text-sm font-bold text-slate-800">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.subtext}</div>
            </div>
          ))}
        </div>

        {/* 3 Customer Proof Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition-all hover:border-purple-300 hover:shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-[#743CFF]">
                    {story.badge}
                  </span>
                  <span className="text-xs font-medium text-slate-400">{story.operatorType}</span>
                </div>

                <h3 className="text-lg leading-snug font-bold text-slate-900">
                  &ldquo;{story.title}&rdquo;
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 italic">{story.quote}</p>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {story.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs font-semibold text-slate-500">📍 {story.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
