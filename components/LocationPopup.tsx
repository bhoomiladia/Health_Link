"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function LocationPopup({ open, onAllow, onDeny }: { open: boolean; onAllow: () => void; onDeny: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 w-full max-w-md rounded-xl bg-white shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold text-primary-900">Allow location access</h3>
            <p className="mt-2 text-sm text-gray-600">
              Allow HealthLink to access your location to find nearby hospitals.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={onDeny}>Deny</Button>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white" onClick={onAllow}>Allow</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
