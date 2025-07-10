import { useState } from "react";

export default function RemoveItemModal({
  setIsRemoveItemModal,
  isRemoveItemModal,
  setShowConfirm,
  setProductToRemove,
  confirmRemove,
  showConfirm,
}) {
  return (
    showConfirm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white w-[400px] p-6 rounded-md shadow-lg">
          <h2 className="text-lg font-bold text-center">Remove Item</h2>
          <p className="text-gray-600 text-center mt-2">
            Are you sure you want to remove this item from cart?
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={confirmRemove}
              className="bg-[#333] text-white font-semibold px-6 py-2 rounded"
            >
              YES, REMOVE
            </button>
            <button
              className="bg-red-700 text-white font-semibold px-6 py-2 rounded"
              onClick={() => {
                setShowConfirm(false);
                setProductToRemove(null);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    )
  );
}
