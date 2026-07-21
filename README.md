Compliance Checklist & Technical Breakdown
1. 5 Distinct States
Idle: Default resting state displaying "Send Message" with an arrow icon.

Hover / Active: Micro-scaling (1.03x) and slight subtle shift (-1px y-axis) to indicate clickability.

Loading: Disables pointer events, renders a smooth spinning loader, and communicates progress ("Sending...").

Success: Tactile spring motion (stiffness: 400, damping: 25) with a checkmark icon indicating completion, auto-resetting back to Idle after 2 seconds.

Error: Displays a destructive feedback badge with an error shake animation and a clear retry action ("Failed. Retry?").

Disabled: Full support for native disabled attribute with adjusted opacity (50%) and cursor-not-allowed.

2. Zero Layout Thrash (Compositor-Friendly)
GPU Acceleration: Animated properties are strictly limited to opacity and transform (y-axis, scale, and x-axis shake).

No Layout Reflows: Content swapping is managed within fixed container bounds using Framer Motion's AnimatePresence (mode="wait"). The browser does not recalculate element geometry or dimensions during transitions.

3. Interruptibility & Robustness
Async Lifecycle: Spam-clicking during loading, success, or error states is intercepted gracefully without breaking internal hooks or timer states.

State Recovery: Clicking on an error or success state allows immediate reset back to idle, giving the user total control over retry flows.

4. Accessibility & Inclusive Design
Focus States: Styled with high-contrast native focus-visible:ring-2 outline indicators for seamless keyboard navigation (Tab / Enter / Space).

Prefers Reduced Motion: Automatically respects user system preferences for reduced motion by suppressing structural transforms and intense shake animations, while maintaining essential color and status transitions.