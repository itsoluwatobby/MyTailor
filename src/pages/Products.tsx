import { LuSettings2 } from "react-icons/lu";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import HomeLayout from "../layout/HomeLayout";
import { getProducts } from "../api/globalRequest";
import { useEffect, useState } from "react";
import { initAppState } from "../utility/initialVariables";
import RequestStages from "../components/RequestStage";
import { useLocation } from "react-router-dom";

export default function Products() {
  const [appState, setAppState] = useState<AppStateType>(initAppState);
  const { search } = useLocation();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setfilteredProducts] = useState<ProductType[]>([]);

  const { isLoading, isError, isSuccess } = appState;

  useEffect(() => {
    const val = search.split('=')[1];
    setfilteredProducts(products?.filter(product => (product.name.toLowerCase()).includes(val))?.sort((a,b) => b.created_at.localeCompare(a.created_at)))
  }, [search.split('=')[1]])

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      try {
        setAppState((prev) => ({ ...prev, isLoading: true }));
        const res = await getProducts() as ProductType[];
        setProducts(res);
        setAppState((prev) => ({ ...prev, isSuccess: true }));
      } catch (err: any) {
        console.log(err);
        setAppState((prev) => ({ ...prev, isError: true }));
      } finally {
        setAppState((prev) => ({ ...prev, isLoading: false }));
      }
    };
    isMounted ? fetchProduct() : null;
    return () => {
      isMounted = false;
    };
  }, []);

  // const sortedProducts = products?.sort((a,b) => b.created_at.localeCompare(a.created_at));

  return (
    <HomeLayout>
      <>
        <div className="px-2 bg-white self-center flex items-center sticky top-0 gap-x-4 z-20 w-full md:w-1/2">
          <SearchBar search={search?.split('=')[1]} />
          <LuSettings2 className="flex-none text-4xl bg-slate-200 p-1 font-normal" />
        </div>

          <div className="relative px-2 h-full self-center grid grid-cols-3 lg:grid-cols-4 mobile:grid-cols-2 gap-x-6 md:gap-x-16 gap-y-10">
            <RequestStages useRelative={true}
            isLoading={isLoading} isError={isError}
            targetVal={products} isSuccess={isSuccess as boolean} errorText="Error Fetching Products" warnText="No products available"
            >
              {
                filteredProducts.map((item) => (
                  <ProductCard key={item.id}
                    img_url={item.img_url}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    estimated={item.estimated}
                    created_at={item.created_at}
                  />
                )) 
              }
            </RequestStages>
          </div>
      </>
    </HomeLayout>
  );
}
