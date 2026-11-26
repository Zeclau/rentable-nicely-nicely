# Restore Module 1 without losing Module 3

## Outcome
Make Module 1 the main rental listing, and preserve Module 3 on its own permanent link. Keep the site's Spanish content and existing visual design.

## Changes
1. **Give each module its own page.** Use `/modulo-1` and `/modulo-3`, with the main address `/` opening Module 1. Add a compact module selector so either page can be reached and shared independently.
2. **Recover Module 1's content from saved history—not a full site rollback.** Restore its identity and module-specific descriptions while keeping the current working forms, agent directory, and gallery viewer.
3. **Use the original Module 1 rental details as the proposed baseline:** U$250 / C$9,250 monthly; approximately 21.50 m²; 4.80 m wide × 4.48 m deep × 2.92 m high. These are historical values, not newly verified measurements or pricing; approving this plan uses them unless you supply updates. Describe it as available for rent without carrying over Module 3's December 9 date.
4. **Separate the media.** Recover the original real Module 1 photos and its original labeled floor plan from history. Review them before assigning them; do not reuse Module 3-only interiors, video, or corner floor plan as Module 1 media. Never restore the AI-generated facade. Keep Module 3's current gallery intact.
5. **Keep Module 3 preserved.** Retain its current details and media at `/modulo-3`; do not silently change its rental status or terms.
6. **Make inquiries specific.** Include the selected module in contact-form WhatsApp messages and page titles, so shared links and inquiries identify the correct unit. Keep the existing shared agent directory and its records unchanged.

## Technical approach
- Use one shared listing layout with separate data for each module, rather than two independently maintained copies of the whole page.
- Add explicit routes and reset page-specific gallery/menu state when switching modules.
- Document the shared-layout decision and update the outdated project rule that only Module 3 may be offered.
- No database changes, new administration screen, or dependency upgrades.

## Checks
- Test the concrete module numbers, prices, dimensions, route selection, and module-specific inquiry messages.
- Verify both direct links, module switching, gallery/lightbox behavior, contact-message handoff, and existing agent-list loading on desktop and mobile.
- Confirm there are no mixed-up module photos, generated facade images, or build errors.
- Leave publishing to you after review.