import Image from "next/image";
// import React from "react";
import ClientPortal from "../Portal";
interface ModalBaseProps {
  children: React.ReactNode;
  setShowModal: Function;
  showModal: boolean;
  header?: boolean;
  className?: string;
}
const ModalBase = ({
  children,
  setShowModal,
  showModal,
  header,
  className = "w-[400px]",
}: ModalBaseProps) => {
  return (
    <>
      <ClientPortal selector="body" show={showModal}>
        <div className="f-center fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm">
          <div
            className={`min-w-[300px] overflow-hidden rounded-lg bg-white p-2 backdrop-blur-sm md:p-3 ${className}`}
          >
            {header && (
              <div onClick={() => setShowModal(false)}>
                <Image
                  src={"/svg/cross.svg"}
                  width={18}
                  height={18}
                  alt="Close modal icon"
                />
              </div>
            )}
            {children}
          </div>
        </div>
      </ClientPortal>
    </>
  );
};

export default ModalBase;
