/**
 * ---------------------------------------------------------------------------
 * Date/time helpers for the demo booking calendar integration.
 *
 * The slot picker presents three human-readable date labels and four IST
 * time strings. This module converts those deterministic display values
 * into RFC 3339 / ISO 8601 datetimes in Asia/Kolkata (UTC+5:30) for use
 * with the Google Calendar API.
 *
 * All times stay in IST — no silent conversion to UTC is performed here.
 * The Google Calendar API accepts UTC offsets in the dateTime field, so we
 * encode the IST offset (+05:30) explicitly rather than converting.
 * ---------------------------------------------------------------------------
 */

/** IST offset from UTC, fixed at +05:30 = 330 minutes. */
const IST_OFFSET_MINUTES = 330

/**
 * Return the calendar date (YYYY-MM-DD) for a given date label.
 *
 * The three labels ("Tomorrow", "In 2 Days", "Next Monday") are resolved
 * relative to the current wall-clock date in IST. Running this on the
 * server means the date is computed at request time, which is consistent
 * with what the visitor selected in the UI.
 */
export function resolveDateLabel(label: string): string {
  // Current time in IST
  const now = new Date()
  const istNow = new Date(now.getTime() + IST_OFFSET_MINUTES * 60 * 1000)

  let targetDate: Date

  switch (label) {
    case 'Tomorrow': {
      targetDate = new Date(istNow)
      targetDate.setUTCDate(targetDate.getUTCDate() + 1)
      break
    }
    case 'In 2 Days': {
      targetDate = new Date(istNow)
      targetDate.setUTCDate(targetDate.getUTCDate() + 2)
      break
    }
    case 'Next Monday': {
      targetDate = new Date(istNow)
      // getUTCDay(): 0=Sun, 1=Mon … 6=Sat
      const dayOfWeek = targetDate.getUTCDay()
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
      targetDate.setUTCDate(targetDate.getUTCDate() + daysUntilMonday)
      break
    }
    default:
      // Fallback: treat as "Tomorrow"
      targetDate = new Date(istNow)
      targetDate.setUTCDate(targetDate.getUTCDate() + 1)
  }

  // Return YYYY-MM-DD
  return targetDate.toISOString().slice(0, 10)
}

/**
 * Parse an IST slot string such as "10:00 AM IST" into { hour, minute }
 * in 24-hour format.
 */
function parseSlotTime(slot: string): { hour: number; minute: number } {
  // Strip the " IST" suffix
  const cleaned = slot.replace(/\s*IST\s*/i, '').trim()
  const [timePart, meridiem] = cleaned.split(' ')
  if (!timePart || !meridiem) {
    throw new Error(`Cannot parse time slot: "${slot}"`)
  }
  const [hourStr, minuteStr] = timePart.split(':')
  let hour = parseInt(hourStr ?? '0', 10)
  const minute = parseInt(minuteStr ?? '0', 10)

  if (meridiem.toUpperCase() === 'PM' && hour !== 12) hour += 12
  if (meridiem.toUpperCase() === 'AM' && hour === 12) hour = 0

  return { hour, minute }
}

/**
 * Build an RFC 3339 datetime string in IST for the Google Calendar API.
 *
 * Example output: "2025-09-10T10:00:00+05:30"
 *
 * @param dateLabel  Human-readable date label from the slot picker.
 * @param slot       IST time string from demoTimeSlots, e.g. "10:00 AM IST".
 */
export function buildIstDatetime(dateLabel: string, slot: string): string {
  const datePart = resolveDateLabel(dateLabel)
  const { hour, minute } = parseSlotTime(slot)

  const hh = String(hour).padStart(2, '0')
  const mm = String(minute).padStart(2, '0')

  return `${datePart}T${hh}:${mm}:00+05:30`
}

/**
 * Add 30 minutes to an ISO datetime string that carries a +05:30 offset.
 * Used to compute the event end time.
 */
export function addMinutes(isoWithOffset: string, minutes: number): string {
  // Parse the datetime into a Date (works because Date.parse handles offsets)
  const base = new Date(isoWithOffset)
  const end = new Date(base.getTime() + minutes * 60 * 1000)

  // Rebuild the string with the original offset preserved
  const [datePart] = isoWithOffset.split('T')
  const endTime = end.toISOString().slice(11, 19) // HH:MM:SS from UTC representation

  // Re-add the IST offset to the end time
  const endInIst = new Date(end.getTime() + IST_OFFSET_MINUTES * 60 * 1000)
  const endHH = String(endInIst.getUTCHours()).padStart(2, '0')
  const endMM = String(endInIst.getUTCMinutes()).padStart(2, '0')
  void endTime // suppress unused warning
  void datePart

  // Re-derive the date part in IST
  const endDate = endInIst.toISOString().slice(0, 10)

  return `${endDate}T${endHH}:${endMM}:00+05:30`
}
