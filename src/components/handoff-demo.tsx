"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Clock, Zap, MapPin, X, ArrowRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Path = "wait" | "switch" | null;
type StepId = 1 | 2 | 3 | 4 | 5;

// ─── Constants ────────────────────────────────────────────────────────────────

const ALTERNATE_FACILITY = {
  name: "Brigade Road Mall Parking",
  distance: "200m away",
  price: "₹40/hr",
};

const STEP_LABELS: Record<StepId, string> = {
  1: "Active bookings",
  2: "Renter A running late",
  3: "Renter B notified",
  4: "Resolution",
  5: "Overstay penalty",
};

// ─── Sub-components ──────────────────────────────────────────────────────────

/** The fixed timeline bar — visual anchor across all steps */
function TimelineBar({ step, path }: { step: StepId; path: Path }) {
  const aEnded = step >= 2;
  const bSwitched = step >= 4 && path === "switch";
  const overstay = step === 5;

  return (
    <div className="relative mb-6">
      <div className="flex h-14 w-full rounded-xl overflow-hidden border border-border/50 shadow-sm">
        {/* Renter A segment */}
        <div
          className={`flex items-center justify-center gap-1.5 text-sm font-medium px-3 transition-all duration-700 ${
            overstay
              ? "bg-destructive/20 text-destructive flex-[3]"
              : aEnded
              ? "bg-deep-navy/8 text-muted-foreground flex-[3]"
              : "bg-action-blue/15 text-action-blue flex-[3]"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              overstay ? "bg-destructive" : aEnded ? "bg-muted-foreground/50" : "bg-action-blue"
            }`}
          />
          Renter A
          {overstay && (
            <span className="ml-1 text-xs font-normal text-destructive/80">(overstay)</span>
          )}
        </div>

        {/* Buffer band */}
        <motion.div
          className="relative flex items-center justify-center text-[10px] font-semibold text-warm-amber/90 overflow-hidden"
          style={{ flex: "0 0 80px" }}
          animate={step === 1 ? { opacity: [0.7, 1, 0.7] } : { opacity: 1 }}
          transition={{ duration: 1.6, repeat: step === 1 ? Infinity : 0 }}
        >
          {/* Hatched background */}
          <div
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                -45deg,
                rgba(245,158,11,0.12) 0px,
                rgba(245,158,11,0.12) 4px,
                transparent 4px,
                transparent 10px
              )`,
              borderLeft: "1px dashed rgba(245,158,11,0.4)",
              borderRight: "1px dashed rgba(245,158,11,0.4)",
            }}
          />
          <span className="relative z-10 whitespace-nowrap text-center leading-tight">
            5–10 min
            <br />
            buffer
          </span>
        </motion.div>

        {/* Renter B segment */}
        <div
          className={`flex items-center justify-center gap-1.5 text-sm font-medium px-3 flex-[3] transition-all duration-700 ${
            bSwitched
              ? "bg-fresh-teal/15 text-fresh-teal"
              : step >= 4 && path === "wait"
              ? "bg-fresh-teal/15 text-fresh-teal"
              : step >= 3
              ? "bg-warm-amber/10 text-warm-amber"
              : "bg-fresh-teal/10 text-fresh-teal/70"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              bSwitched || (step >= 4 && path === "wait")
                ? "bg-fresh-teal"
                : step >= 3
                ? "bg-warm-amber"
                : "bg-fresh-teal/40"
            }`}
          />
          Renter B
          {bSwitched && (
            <span className="ml-1 text-xs font-normal text-fresh-teal/80">(switched)</span>
          )}
        </div>
      </div>

      {/* Time labels */}
      <div className="flex justify-between mt-1.5 text-[11px] text-muted-foreground">
        <span>2:00 pm</span>
        <span className="text-warm-amber/80">4:55–5:05 pm</span>
        <span>5:00 pm</span>
        <span>7:00 pm</span>
      </div>
    </div>
  );
}

/** Progress dots */
function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-400 ${
            i + 1 === current
              ? "w-5 h-2 bg-action-blue"
              : i + 1 < current
              ? "w-2 h-2 bg-action-blue/40"
              : "w-2 h-2 bg-border"
          }`}
        />
      ))}
      <span className="ml-2 text-xs text-muted-foreground">{STEP_LABELS[current as StepId]}</span>
    </div>
  );
}

/** Toast notification — slides in from top-right */
function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3200);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="absolute top-0 right-0 flex items-center gap-2 bg-deep-navy text-white text-xs font-medium rounded-xl px-3.5 py-2.5 shadow-lg z-20"
    >
      <CheckCircle className="w-3.5 h-3.5 text-fresh-teal shrink-0" />
      {message}
    </motion.div>
  );
}

// ─── Step content components ──────────────────────────────────────────────────

function Step1() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground max-w-lg">
        Two back-to-back bookings at <strong className="text-deep-navy">UB City Underground</strong>.
        A 5–10 minute buffer is automatically inserted between them so handoffs stay smooth.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Renter A card */}
        <div className="bg-action-blue/8 border border-action-blue/20 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-action-blue/20 text-action-blue text-xs font-bold flex items-center justify-center">A</span>
            <span className="text-sm font-semibold text-deep-navy">Renter A</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> 2:00 pm – 5:00 pm · slot ends in 5 min
          </div>
          <div className="text-xs font-medium text-action-blue">Currently parked</div>
        </div>
        {/* Renter B card */}
        <div className="bg-fresh-teal/8 border border-fresh-teal/20 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-fresh-teal/20 text-fresh-teal text-xs font-bold flex items-center justify-center">B</span>
            <span className="text-sm font-semibold text-deep-navy">Renter B</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" /> 5:00 pm – 7:00 pm · starts soon
          </div>
          <div className="text-xs font-medium text-fresh-teal/70">Upcoming</div>
        </div>
      </div>
      {/* Buffer callout */}
      <div className="flex items-start gap-2 bg-warm-amber/8 border border-warm-amber/25 rounded-xl px-4 py-3 text-xs text-warm-amber/90">
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>The <strong>amber zone</strong> above is ParkNear's built-in buffer window — it gives Renter A time to leave before B arrives, preventing confrontation.</span>
      </div>
    </div>
  );
}

function Step2({ onToast }: { onToast: () => void }) {
  const [tapped, setTapped] = useState(false);

  const handleTap = () => {
    setTapped(true);
    onToast();
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground max-w-lg">
        Renter A's slot has ended but no check-out detected. ParkNear prompts them directly.
      </p>
      {/* Status banner */}
      <div className="flex items-center gap-2.5 bg-warm-amber/10 border border-warm-amber/30 rounded-xl px-4 py-3">
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <AlertTriangle className="w-4 h-4 text-warm-amber" />
        </motion.div>
        <span className="text-sm font-medium text-warm-amber">Renter A hasn't checked out yet</span>
        <span className="ml-auto text-xs text-muted-foreground">5:03 pm</span>
      </div>
      {/* Phone mockup — Renter A's action */}
      <div className="bg-deep-navy/[0.04] border border-border/60 rounded-xl p-4 space-y-2">
        <div className="text-[11px] font-medium text-muted-foreground mb-2">Renter A's device</div>
        <div className="bg-card rounded-lg border border-border/50 px-3 py-2.5 text-sm text-deep-navy">
          ⏱ Your booking at UB City ended 3 min ago. Are you still there?
        </div>
        <motion.button
          onClick={handleTap}
          disabled={tapped}
          whileTap={{ scale: 0.96 }}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
            tapped
              ? "bg-fresh-teal/20 text-fresh-teal border border-fresh-teal/30 cursor-default"
              : "bg-deep-navy text-white hover:bg-deep-navy/90 active:bg-deep-navy"
          }`}
        >
          {tapped ? "✓ Sent — running 10 min late" : "I'm running 10 min late"}
        </motion.button>
      </div>
    </div>
  );
}

function Step3({ onChoose }: { onChoose: (p: Path) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground max-w-lg">
        Renter B gets a real-time notification before arriving. They can wait or switch.
      </p>
      {/* Notification card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card border border-border/60 rounded-xl p-4 shadow-sm space-y-3"
      >
        <div className="text-[11px] font-medium text-muted-foreground">Renter B's device</div>
        <div className="text-sm text-deep-navy leading-snug">
          <span className="font-semibold">Your spot may be occupied a few extra minutes</span> — Renter A is running late. We've extended the buffer window to cover you.
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onChoose("wait")}
            className="py-2.5 rounded-lg text-sm font-medium border border-border/60 text-deep-navy hover:bg-muted/50 transition-colors"
          >
            Wait
          </button>
          <button
            onClick={() => onChoose("switch")}
            className="py-2.5 rounded-lg text-sm font-medium bg-action-blue text-white hover:bg-action-blue/90 transition-colors flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            Switch · {ALTERNATE_FACILITY.distance}
          </button>
        </div>
      </motion.div>
      <p className="text-[11px] text-muted-foreground">
        Choose an outcome above to continue the simulation.
      </p>
    </div>
  );
}

function Step4({ path, onTriggerOverstay }: { path: Path; onTriggerOverstay: () => void }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {path === "switch"
          ? "Renter B switched to a nearby spot — instantly rebooked, no disruption."
          : "Renter B waited. Renter A checked out within the grace period — no penalty."}
      </p>

      {path === "switch" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-fresh-teal/8 border border-fresh-teal/25 rounded-xl p-4 space-y-2"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-fresh-teal" />
            <span className="text-sm font-semibold text-deep-navy">Rebooked instantly</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-action-blue" />
            {ALTERNATE_FACILITY.name} · {ALTERNATE_FACILITY.distance} · {ALTERNATE_FACILITY.price}
          </div>
          <div className="text-xs text-fresh-teal">Original price honored. No re-booking fee.</div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-2"
        >
          <div className="bg-fresh-teal/8 border border-fresh-teal/25 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-fresh-teal" />
              <span className="text-sm font-semibold text-deep-navy">Renter A checked out — 5:08 pm</span>
            </div>
            <div className="text-xs text-muted-foreground">Within the grace window. No overstay charge applied.</div>
          </div>
          <div className="bg-action-blue/8 border border-action-blue/20 rounded-xl p-3 text-xs text-action-blue/90">
            Renter B's booking started at 5:10 pm as planned. Reliability score unchanged for both.
          </div>
        </motion.div>
      )}

      {/* Escape hatch — what if A had stayed longer? */}
      <button
        onClick={onTriggerOverstay}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-warm-amber transition-colors"
      >
        <ArrowRight className="w-3 h-3" />
        What if Renter A didn't leave in time?
      </button>
    </div>
  );
}

function Step5() {
  const [charge, setCharge] = useState(0);
  const targetCharge = 90; // ₹ per extra 30 min

  useEffect(() => {
    let frame: ReturnType<typeof requestAnimationFrame>;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setCharge(Math.round(targetCharge * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2 bg-destructive/8 border border-destructive/25 rounded-xl px-4 py-3 text-sm text-destructive/90">
        <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
        <div>
          <div className="font-semibold mb-0.5">Overstay detected — only past the grace period</div>
          <div className="text-xs text-muted-foreground">Renter A did not check out within the 10-min buffer. Auto-billing applies.</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Charge card */}
        <div className="bg-card border border-border/60 rounded-xl p-4 space-y-1">
          <div className="text-xs text-muted-foreground">Extra-time charge (auto-billed)</div>
          <div className="text-3xl font-bold text-destructive tabular-nums">
            ₹{charge}
          </div>
          <div className="text-[10px] text-muted-foreground">per 30 min overstay increment</div>
        </div>
        {/* Reliability score */}
        <div className="bg-card border border-border/60 rounded-xl p-4 space-y-1">
          <div className="text-xs text-muted-foreground">Reliability score</div>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-warm-amber tabular-nums">4.6</span>
            <span className="text-sm text-destructive mb-0.5">↓ 4.3</span>
          </div>
          <div className="text-[10px] text-muted-foreground">Affects host confidence in future bookings</div>
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground leading-relaxed">
        Renter B, already rerouted in the previous step, was not affected. The charge and score change apply to Renter A's account only.
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function HandoffDemo() {
  const [step, setStep] = useState<StepId>(1);
  const [path, setPath] = useState<Path>(null);
  const [showToast, setShowToast] = useState(false);
  const totalSteps = path !== null || step >= 4 ? 5 : 4;

  const handleChoose = (p: Path) => {
    setPath(p);
    setStep(4);
  };

  const handleOverstay = () => {
    setStep(5);
  };

  const canAdvance =
    (step === 1) ||
    (step === 2) ||
    // Step 3 advances only via path choice buttons (handled inline)
    (step === 5);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    // step 3 → handled by path buttons
    // step 4 → handled by overstay link or end
    // step 5 → restart
    else if (step === 5) {
      setStep(1);
      setPath(null);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setPath(null);
    setShowToast(false);
  };

  return (
    <div className="bg-background">
      <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-deep-navy">How Handoffs Work</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Booking-buffer &amp; overstay handling — live simulation
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="text-xs text-muted-foreground hover:text-deep-navy transition-colors"
          >
            Restart
          </button>
        </div>

        <div className="p-6 space-y-5 relative">
          {/* Toast notification */}
          <AnimatePresence>
            {showToast && (
              <Toast
                message="Confirmed — extension logged within grace period"
                onDismiss={() => setShowToast(false)}
              />
            )}
          </AnimatePresence>

          {/* Progress dots */}
          <ProgressDots total={step === 5 ? 5 : 4} current={step > 4 ? 5 : step} />

          {/* Timeline bar — persistent */}
          <TimelineBar step={step} path={path} />

          {/* Step card — animated transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="min-h-[180px]"
            >
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 onToast={() => setShowToast(true)} />}
              {step === 3 && <Step3 onChoose={handleChoose} />}
              {step === 4 && <Step4 path={path} onTriggerOverstay={handleOverstay} />}
              {step === 5 && <Step5 />}
            </motion.div>
          </AnimatePresence>

          {/* Bottom nav */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              Step {step > 4 ? 5 : step} of {step === 5 ? 5 : 4}
            </div>
            {step !== 3 && (
              <button
                onClick={handleNext}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm ${
                  step === 5
                    ? "bg-deep-navy/10 text-deep-navy hover:bg-deep-navy/15"
                    : step === 4
                    ? "bg-fresh-teal text-white hover:bg-fresh-teal/90"
                    : "bg-action-blue text-white hover:bg-action-blue/90 shadow-action-blue/20"
                }`}
              >
                {step === 5 ? "Restart demo" : step === 4 && path !== null ? "Done" : "Next"}
                {step < 4 && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
