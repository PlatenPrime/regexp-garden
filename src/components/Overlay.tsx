import styles from "@/app/levels/[level]/page.module.css";

export type OverlayProps = { shouldShow: boolean };

export const Overlay: React.FC<OverlayProps> = ({ shouldShow }) => {
  return (
    shouldShow && (
      <>
        <div className="min-h-screen w-full absolute inset-0 bg-black opacity-50 z-10 pointer-events-auto" />
        <div
          className={`absolute inset-0 min-h-screen z-10 opacity-90 pointer-events-auto ${styles.overlay}`}
        />
      </>
    )
  );
};
