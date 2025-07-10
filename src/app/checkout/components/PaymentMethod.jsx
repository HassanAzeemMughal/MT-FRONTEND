// import React, { useEffect, useState } from "react";
// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import PaymentImage from "../../../assets/card-payment-image/payment-image.png";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { deleteAllFromCart } from "@/features/cart/cart-slice";
// import { toast } from "react-toastify";

// const PaymentMethod = ({
//   formData,
//   total,
//   validateField,
//   setFormErrors,
//   fieldRefs,
// }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   const createPaymentMethod = async (cardElement, stripe) => {
//     try {
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: "card",
//         card: cardElement,
//       });
//       if (error) throw error;
//       return paymentMethod;
//     } catch (error) {
//       handleError(error);
//       return null;
//     }
//   };

//   const createPaymentIntent = async (pmId) => {
//     try {
//       const body = {
//         pmId: pmId,
//         amount: total * 100,
//       };
//       const res = await postApi(`orders/create-payment-intent`, body);
//       if (res.success) {
//         return { clientSecret: res.clientSecret, status: res.status };
//       } else {
//         toast.error(res.message || "Failed to create payment intent");
//       }
//     } catch (error) {
//       handleError(error);
//       return null;
//     }
//   };

//   const confirmPayment = async (clientSecret, cardElement, stripe) => {
//     try {
//       const return_url = "http://localhost:3000/";
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: { card: cardElement },
//           return_url: return_url,
//         }
//       );
//       if (error) throw error;
//       return paymentIntent;
//     } catch (error) {
//       handleError(error);
//       return null;
//     }
//   };

//   const handleCardAction = async (clientSecret, stripe) => {
//     try {
//       const { error, paymentIntent } = await stripe.handleCardAction(
//         clientSecret
//       );
//       if (error) throw error;
//       return paymentIntent;
//     } catch (error) {
//       handleError(error);
//       return null;
//     }
//   };

//   const handleError = (error) => {
//     console.error("[error]", error);
//     const errorCode = error?.code || "";
//     switch (errorCode) {
//       case "incomplete_number":
//         toast.error(`Error: ${error.message}`);

//         setErrors((prev) => ({ ...prev, cardNumber: error.message }));
//         break;
//       case "incomplete_expiry":
//         toast.error(`Error: ${error.message}`);

//         setErrors((prev) => ({ ...prev, expiry: error.message }));
//         break;
//       case "incomplete_cvc":
//         toast.error(`Error: ${"CVC INCOMPLETE"}`);

//         setErrors((prev) => ({ ...prev, cvc: "CVC INCOMPLETE" }));
//         break;
//       default:
//         setErrors({ general: error.message });
//     }
//     setLoading(false);
//   };

//   const handlePayment = async (event) => {
//     setErrors({});
//     setLoading(true);

//     const newErrors = {};

//     // Validate all fields
//     Object.keys(formData).forEach((field) => {
//       const error = validateField(field, formData[field]);
//       if (error) {
//         newErrors[field] = error;
//       }
//     });
//     setFormErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       const firstErrorField = Object.keys(newErrors)[0];
//       fieldRefs.current[firstErrorField]?.focus();
//       return;
//     }

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardNumberElement);
//     const paymentMethod = await createPaymentMethod(cardElement, stripe);

//     if (paymentMethod) {
//       const { clientSecret, status } = await createPaymentIntent(
//         paymentMethod.id
//       );
//       if (!clientSecret) {
//         setLoading(false);
//         return;
//       }

//       let paymentIntent;
//       if (status === "requires_confirmation") {
//         paymentIntent = await confirmPayment(clientSecret, cardElement, stripe);

//         if (paymentIntent?.status === "requires_action") {
//           paymentIntent = await handleCardAction(clientSecret, stripe);
//         }
//         if (paymentIntent.status === "succeeded") {
//           toast.success("Payment succeeded!");

//           await createOrder(paymentIntent.id);
//         } else {
//           console.error("Payment failed with status:", paymentIntent.status);
//           toast.error("Payment failed. Please try again.");

//           setErrors({ general: "Payment failed, please try again" });
//         }
//       } else {
//         console.log("Payment succeeded without confirmation.");
//       }
//     }

//     setLoading(false);
//   };

//   const createOrder = async (paymentIntentId) => {
//     try {
//       const body = {
//         user: user.user._id,
//         products: cartItems,
//         paymentIntentId,
//         deliveryAddress: formData,
//         total: total,
//       };
//       const res = await postApi(`orders/create`, body);
//       if (res.success) {
//         toast.success("Order Created");

//         dispatch(deleteAllFromCart());
//         router.push(`/order/complete/${res.data.orderRef}`);
//       } else {
//         toast.error(res.message || "Failed to create order. Please try again.");
//       }
//     } catch (error) {
//       let errorMessage = "Something went wrong!";
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
//       toast.error(`Error: ${errorMessage}`);
//     }
//   };

//   const handleCardNumberChange = (event) => {
//     if (event.error) {
//       setErrors((prev) => ({ ...prev, cardNumber: event.error.message }));
//     } else {
//       setErrors((prev) => ({ ...prev, cardNumber: null }));
//     }
//   };
//   const handleExpiryChange = (event) => {
//     if (event.error) {
//       setErrors((prev) => ({ ...prev, expiry: event.error.message }));
//     } else {
//       setErrors((prev) => ({ ...prev, expiry: null }));
//     }
//   };
//   const handleCvcChange = (event) => {
//     if (event.error) {
//       setErrors((prev) => ({ ...prev, cvc: event.error.message }));
//     } else {
//       setErrors((prev) => ({ ...prev, cvc: null }));
//     }
//   };

//   const cardElementOptions = {
//     style: {
//       base: {
//         fontSize: "16px",
//         color: "#aab7c4",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//     showIcon: true,
//   };

//   return (
//     <div className="">
//       <h2 className="text-2xl font-bold mb-6">PAYMENT METHOD</h2>
//       <div className="border-2 p-8">
//         <div className="flex items-center space-x-2 mb-4">
//           <Image src={PaymentImage} alt="Visa" className="" />
//         </div>
//         <form id="checkout-payment-form" onSubmit={(e) => e.preventDefault()}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Card Number
//             </label>
//             <div className="border border-gray-300 p-2 rounded-md bg-gray-100">
//               <CardNumberElement
//                 className="w-full"
//                 options={cardElementOptions}
//                 onChange={handleCardNumberChange}
//               />
//               {errors.cardNumber && (
//                 <span className="error-text">{errors.cardNumber}</span>
//               )}
//             </div>
//           </div>
//           <div className="flex space-x-4 mb-4">
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Expiration Date
//               </label>
//               <div className="border border-gray-300 p-2 rounded-md bg-gray-100">
//                 <CardExpiryElement
//                   className="w-full"
//                   options={cardElementOptions}
//                   onChange={handleExpiryChange}
//                 />
//                 {errors.expiry && (
//                   <span className="error-text">{errors.expiry}</span>
//                 )}
//               </div>
//             </div>
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 CVV
//               </label>
//               <div className="border border-gray-300 p-2 rounded-md bg-gray-100">
//                 <CardCvcElement
//                   className="w-full"
//                   options={cardElementOptions}
//                   onChange={handleCvcChange}
//                 />
//                 {errors.cvc && <span className="error-text">{errors.cvc}</span>}
//               </div>
//             </div>
//           </div>

//           <button
//             className="bg-black text-white py-3 px-6 rounded-md w-full text-center font-medium transition-all hover:bg-red-700"
//             onClick={handlePayment}
//             disabled={loading}
//           >
//             {loading ? "Please wait..." : "Place Order"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethod;
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteAllFromCart } from "@/features/cart/cart-slice";
import { toast } from "react-toastify";
import PaymentImage from "../../../assets/card-payment-image/payment-image.png";
import { postApi } from "@/services/ApiService";

const PaymentMethod = ({
  formData,
  total,
  validateField,
  setFormErrors,
  fieldRefs,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const handleError = (error) => {
    console.error("[Stripe Error]", error);
    toast.error(error.message || "An unexpected error occurred");
    setErrors((prev) => ({ ...prev, general: error.message }));
    setLoading(false);
  };

  const handlePayment = async () => {
    setErrors({});
    setLoading(true);

    // Validate form fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      fieldRefs.current[Object.keys(newErrors)[0]]?.focus();
      setLoading(false);
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe is not properly initialized");
      setLoading(false);
      return;
    }

    try {
      const cardElement = elements.getElement(CardNumberElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) throw error;

      const response = await postApi("orders/create-payment-intent", {
        pmId: paymentMethod.id,
        amount: total * 100,
      });
      if (!response.success)
        throw new Error(response.message || "Failed to create payment intent");

      const { clientSecret, status } = response;
      let paymentIntent;

      if (status === "requires_confirmation") {
        paymentIntent = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });
        if (paymentIntent.error) throw paymentIntent.error;
      }

      if (paymentIntent?.paymentIntent?.status === "requires_action") {
        const actionResult = await stripe.handleCardAction(clientSecret);
        if (actionResult.error) throw actionResult.error;
        paymentIntent = actionResult;
      }

      if (paymentIntent.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        await createOrder(paymentIntent.paymentIntent.id);
      } else {
        throw new Error("Payment failed, please try again");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (paymentIntentId) => {
    try {
      console.log("======user", user);
      const response = await postApi("orders/create", {
        user: user._id,
        products: cartItems,
        paymentIntentId,
        deliveryAddress: formData,
        total,
      });

      if (!response.success) throw new Error(response.message);

      toast.success("Order Created Successfully");
      dispatch(deleteAllFromCart());
      router.push(`/complete/${response.data.orderRef}`);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">PAYMENT METHOD</h2>
      <div className="border-2 p-8">
        <div className="flex items-center space-x-2 mb-4">
          <Image src={PaymentImage} alt="Payment" />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Card Number</label>
            <div className="border p-2 rounded-md bg-gray-100">
              <CardNumberElement className="w-full" />
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                Expiration Date
              </label>
              <div className="border p-2 rounded-md bg-gray-100">
                <CardExpiryElement className="w-full" />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">CVV</label>
              <div className="border p-2 rounded-md bg-gray-100">
                <CardCvcElement className="w-full" />
              </div>
            </div>
          </div>
          <button
            className="bg-black text-white py-3 px-6 rounded-md w-full hover:bg-red-700"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethod;
