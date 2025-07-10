import React, { useEffect } from "react";
import { Card } from "antd";
import Image from "next/image";
import SpeakerIcon from "../../assets/images/speaker.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryData } from "@/features/category/categorySlice";
import NoImage from "../../assets/no-image/no-image-icon.png";
import { useRouter } from "next/navigation";

const MainPageCategory = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data = [], loading, error } = useSelector((state) => state.category);
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  const parentCategories = Array.isArray(data)
    ? data.filter((cat) => cat.parent === null)
    : [];

  const handleCategoryRealtedProduct = (category) => {
    router.push(`/shop/category/${category.slug}`);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-20">
        {parentCategories.map((category, index) => (
          <div
            key={index}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => handleCategoryRealtedProduct(category)}
          >
            <div className="w-40 h-40 bg-bg-eerie-black rounded-full flex items-center justify-center">
              {category?.image ? (
                <Image
                  src={`${backendUrl}/${category.image}`}
                  alt="Smart Watch"
                  className="w-28 h-28 object-contain"
                />
              ) : (
                <Image
                  src={NoImage}
                  alt="No Image Available"
                  className="w-28 h-28 object-contain"
                />
              )}
            </div>
            <p className="text-white text-lg mt-2">{category?.title}</p>
          </div>
        ))}
      </div>

      {/* <div className="pt-5 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-5 min-w-max">
          {parentCategories.map((category, index) => (
            <div key={index} className="min-w-[409px]">
              <Card className="h-[230px]">
                <div className="h-full flex items-center justify-between">
                  <div className="ps-5 flex flex-col justify-center h-full">
                    <h2 className="text-red-600 text-xl font-bold mb-2">
                      10% OFF
                    </h2>
                    <h1 className="text-4xl font-bold text-gray-800">
                      {category?.title}
                    </h1>
                  </div>
                  <div className="flex items-center justify-center h-48 w-48">
                    {category?.image ? (
                      <Image
                        src={`${backendUrl}/${category.image}`}
                        alt="Category Image"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 w-48 rounded-md">
                        <Image
                          src={NoImage}
                          alt="No Image Available"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default MainPageCategory;
