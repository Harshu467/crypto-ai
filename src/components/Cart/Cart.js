import React from "react";
import "./Cart.css";
import { Add, Cross, Minus } from "@/helpers/icons";
const DetailsCart = () => {
  const CartItem = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      qty: 1,
      cover:
        "https://lh3.googleusercontent.com/fife/ALs6j_HN4JkT1kACZG6_Lq30HiPOjkwDNzgVAxmV-e5K07rx93J0E-CnZa_T3lc9UM17DFb7wSmGQNiMQ1HOQzVh_-qc8Nhugype5-sOc3i7vmHWkvJ_wamd_Ek4sSOdPIN8OdZgPOtZ-osWV9KG5CYFeAr_X2Rw7ZCzP3A3W1kc7ite6oVB_4kDEATFy47SVpXAkjJHHVWhT08790mX_KkW9feGTdOCetifg52-cl1_wJkPkUJiRzkgzY7GYl5qpoAdKERc0C5t7_yZWCtFE4yZFPhhVCioBs241suQqXzMQ8Q3Ng5an2T_j8DEuKZB0WcLpChLI0eIKma3-lyF_bbLxRKVE6FbeQrSol3nuQALO33kNsY4sSFoIS_VmQPhWSEjA_B91Ykcy2wVHjNnG9PrNUSYOqU6Gt5w2rZD0jsbn1X1Ntrzx4KHibAtIeKaZ5UX-2Rq1m9hR0oG-3otk8doFPooc6ZeInN3MPNN736g7lAy2TaFmRydSKUyoQCbIpHlbbyrFw0KzP46ZwNLBFMShMe3YILrn6zAfqtuAZqYPkdfahszfNnD3dpMeO1roYSn_ZBNh83Oh9FfjSuGw0JRGLpPj3XqKL2HL4AdMCD7ovnz_nwoGK3ji0VqV3AHUeuRJLd1tlmm6Tk1dv7OdhozyKLt5omZ1c_MQ4kkH66SLkxpZWH0eSi0xrwpIcLwnJVKqBTGjMeKrbnfQTlBUo6qimRES3fvYgScgaAT9HvTQes0ntKORq3gm0eRIM65ThWrmK2x38aoTWOOi8ku9ruwY_pCPE-31gtYBGS5n_8nCXqDzdIDJCBbHxZNRnqkF2QUQrkIip6r9ECath_wsR82PapgYNbJYmnW0zncPxpNDrnzlAdeVSEG88Sy0WNzCNj2Xkk6Z698lsvkHBcrq4ZyKGWCTkUt5YAbRidmPwFNkgMkShN8mXDj4fGyWbrQ7x-s55hgCW_Niz-9EP4WcVDHL02hanYesm7LFKJ3Z256UCXs5Y-pyiXkHdF8XJNhmE-6QULkbiKPk4v7mB4cnAo-kqHZ2CNfgLQMc6hlBD60rW-V13_MD3aP2GtF7cTmCx_jMWkSMy0JdXLr7bqs18tBquCTOK7zK5lwuJkB7vD-ZpmU_8G6xSC1YXstS7dSzuFQ_f-L5Tsp4i0SAhRgSNuAoIN5HxmIpW8lwB_LqXJ-R8AgPvXnxSOa5cpsBCZOcqzXlhA2SnX2eMVFGVcIGchbcrdlkBPxm3TdjuW5Vp7aFiGbtByUc2CIaG9WH04EbfwYESOEFKjiD4--oQmx518P_ZZPI37qMh_H5uHRkUmaOLYiatn1qlouMgiqHpSDetz0nCRYJen60ok19A2sYyIzuiCqHSPgiwFQdfyFfqvAC5gOELFoEXHMOp8N2skd6vGey0i2HFolFalvL0TwcT1bB7AMzcraAwJQWgNZq3ILuW8001pfwqTCyjX1C8q_PTdp=s512?authuser=2",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      qty: 2,
      cover:
        "https://lh3.googleusercontent.com/fife/ALs6j_FSgzbVSfdevnIb3I2cuETiA_S1ZnIC4fNJgnIykUiQrA3S1dW5TP-iegLwlwm7RyEZMB-BUhAjsNFO9pst2wtHF8UnV2xCxYlQZ4J63oimgjnhinloZCp5N2OUiyW8ZbM-iHyEk7j4zSd1bOmArfw5rfGJ7XgQUptoHMCYc8JZ-ED8nvX3LBNY1lBTg5ll-LNdw3nEbzp8xHwNcZ1-TLaIYafjvErxGrOQfi6bJxp9mHgS78Dh81dMkl0q4ukPvXjZH94nbeZdotWnExjOPkbVKVZZXceQ7Kv-8CcdQKgM25bcBQm6IbhDyc-oLllUSp7vTZsGaSwBv1y6if2DQ_sZqdn8f8-JcBjGimDJQHF2KGNyKF0iVy5Y2z915RbPvskx5w1xBc-FMFL0KnqD0Cqd6Kg02z2tNdV8zuxER26INleCQSak3dqEL3tQ7t7xWDBXvkgyPITAekJd7QAQpKwrb-jbK2U9qiFIpuYVfbE4V2g7Pp_2fzPCaQuGZ5E5hiLtIHZwBdTwlbLOg2lS2nrrpwVdkB_Fu2yBss2xOwnKEmNYTOTBgcKThtLBx-oLDaNVfoKVFSDrS7v9LbODgC-vzmkFPtyx01a3VpL71LTEAM2DdXITYSDZH3_l998SULWsj8mZgrj_JxjNft5EYHpqC2bnvKtAq0VVpCY8aFHN0-rlsN8mzHxp7UX1cEnO7HNRg_IkbIr0MJ7thEbqR0XL6Q6uUQSQmDkokszFQMz1WM32MJN-_pnvqSDCTWVhQJ9WpI7sLxy6tj9iJ59hLRDMzFoL8H_NXG36gdZhFGx1OTFRG7A6I7ISwrd9R_fVjfVdQ3GeoF9cQJU3XwIUyoADIzwapwcm8Q7-8M-yGYUwb3AtWmFBWNeiO1gAuVB_3YOZ7YfW4Z4FHyGePIfxcSELmtS5zzWJlXrOdnHEk_SzKxGZLYZA4A7koXUPfFp_i2He01BjapfJelJsMAuWaHWpoHrYmsi0NrjYzoHrfGPbmj9BSuA5FQw6rjnn2wv72gBdECRjjikukLefQ5uv3KlYySh50WvGVF7va4IWOlh4eLqm4O46CjSElnp0otMkcevE0Q2b-90BbaGSrPwXRH5Im2tGlt6HSZAJkUjISN0l4Cx0TiEQsJS542lKz7BRCIZDuA1mn7jm9MHGdlRwR5NNI-bon_RsxAjwDJU6OVItxORJA-Cwvyzt1UEsLEV6ZgSFyzQ64bpGd4GHcTjCKSWbRTQRe56KORQ5lmWqshGd7BneZFmynP4PUVfhrPOvBqeohUP1yDQqfUUOkR9UGAGCgF8cCNQjuynODmFmq86-fYnKuspX43obkut8XSWYjV2GpWoZdYITr_5fGX5JbehS3iZTHkcts7rX3Qbdtcc6AVZkYMMmP819umHyBKPc8hZIYd0D2Ahva2AxfF1FnnI9GZVIeCzXz9jBxZZYHgvUZh5ZWEBTBjysi3ApoIlZucBSZoFejQ=s512?authuser=2",
    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      qty: 3,
      cover:
        "https://lh3.googleusercontent.com/fife/ALs6j_HGq4PKMPBB65edAAi-PDdhSbmpP7JhMRcEy8MzLNH7ac7w4VWW8bu45uyh0bjhu-3Rn_ohmP9l-PWUwc-wj5IsgplMbGo8WLF59tzDGsp2XKribddzXQX3dkcyYuRDs8t_7eY8-iVFCNwFMnuL3fGIWrmJdomMDNh6vu7EHVJeid-2lA2546KQATWvMUI8tlsDCPdqArMjwERavSsfSHPd4o31r94cn4NQuiUd5wtxaVkj_0mlTgXHE1YDYimEsskbXdzx1QieIdbtear5ss0XD5bH5mSq2VGnSyhK7BoVNX0bOo4Tk6bnxZHqbRwuhsxXdPLyuEEPfQbBO3QnlzW_Ju3Gi2eVkkwXycmaPzat5_uVMb5BR0jgwBT3Xq0A3-7_JgwPnjZrs6pnV-0Eay30jFwCE0OPVp0SuzFKTCEzlz0eWCXF15wCFfSa8B6TYxlgnMLVG3BGJNX7GPvjYYkMqEfSqF36-VTVLtPUt3p4gqkQE_uYEJ-t4ESnhpxgpb8Cp2EW3ezUHcwmT-SueI2U-DBy9LsFSsQMrhIYm5IyfU4BZJFtfL4HZLXnqZJ06KtTW-flcC7dzNT83XJ2XZKDg_mMhwB0Qmu_-zHl8ihcO0XblUxdL1ZfWc2tnpyi1wooXW9Z9f8Ubkw7gLeJDW1HShUMmEwYnkJdMj0yTCnTpGoU-dCOc8DQqtNAU7uxZc-1WJYOlBJ2dpo8vm-NLDgoDHPdXzWE7Xmk6Y2bONV2zFHIUtPDLA2-lfmDeALtjhm03RJBgBePdD9XkCuXDFr6-u4XGOnWTsl0XxYwwGTs6qfkawQGgMWSBe6UZTVPVpHYpxMDQHeVbgwbbt0yqsgk5O6xDGOfMtPnmaIxQc5BnCS2PYx_pseIipgpuIxPwb4yvx08-xnwjkP70x3ehxgcQY8LIMzO1-v94YIeoeHs3UpMY_5cYZwykapEBTcI0U3gV4IZ-UEEaPlj4SNnvzvi9U7H4nlaY9gzbmuB8rQESo7fLj-MD21c2_Fqb5cpiatz8UzGOwOXvlws2UT7_9y-NRERxLPP7zMKsW55RjeP2GTZHpPQ-r_BPqSGljWeuj4C4Mdt-1tPfrblCUGljCjVYTgiMyFD-G-QwEr4YA9ou4QlBhh3CYorEKeJ06qOxi1xiaVPrw65ckupYFHG69Q6FqxtgoMDqF9_A9y_UZ2u88yZ0ywSbuAqlFdkNW65TBqbB1YAETc6IWTFkzysC-YmtfMu7sPWrZqUnoDHSR88zflFPqNBIeLDnyibffEMNy62pgYMhQ7RMOPJuRVbxlamiRvYGlNDwI-Ws9H3hsKHA-imEqMcn-NsK33gpls19A6GeFXB2tzl29YV8cEktdD5wiJMcGWzXJswPe4LwWSo5H4Unjmas_PpdB4JNc_lYL-K_pZYg7e3A4fYxDBQI3S1bKj2w08G0h70gfcWSf3Tz4hm0BU1OJdreMv4omK09XRBIPIDVg=s512?authuser=2",
    },
  ];
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );
  return (
    <>
      <section className="cart-items">
        <div className="container flex justify-between">
          <div className="cart-details flex flex-col gap-[16px] mx-[5rem]">
            {CartItem.length === 0 && (
              <h1 className="text-[#e94560] font-medium text-lg justify-center mt-[30px] h-[200px] bg-black p-5 relative shadow-xl rounded-md border border-gray-800 m-4">
                No Items are add in Cart
              </h1>
            )}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty;

              return (
                <div
                  className="cart-list shadow-xl rounded-md text-white border border-gray-800 mt-1 bg-black p-5 relative rounded-lg shadow-md m-4 flex justify-between"
                  key={item.id}
                >
                  <div className="w-40 h-40">
                    <img
                      src={item.cover}
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                  <div className="cart-details pl-[30px]">
                    <h3>{item.name}</h3>
                    <h4>
                      ₹{item.price}.00 * {item.qty}
                      <span>₹{productQty}.00</span>
                    </h4>
                  </div>
                  <div className="cart-items-function">
                    <div className="text-[#e94560] text-xl text-right mr-4">
                      <button className="">
                        <Cross />
                      </button>
                    </div>
                    <div className="cartControl flex justify-between">
                      <button
                        className="flex items-center justify-center border border-solid border-gray-200 hover:border-gray-300 text-[#e94560]"
                        onClick={() => addToCart(item)}
                      >
                        <Add />
                      </button>
                      <span className="flex items-center justify-center px-[4px]">
                        1
                      </span>
                      <button
                        className="flex items-center justify-center border border-solid border-gray-200 hover:border-gray-300 text-[#e94560]"
                        onClick={() => decreaseQty(item)}
                      >
                        <Minus />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-price"></div>
                </div>
              );
            })}
          </div>

          <div className="w-[30%] mt-[30px] ml-[30px] shadow-xl h-[200px] rounded-md text-white border border-gray-800 bg-black p-5 relative rounded-lg shadow-md m-4">
            <h2 className="text-lg mb-5 font-bold border-b border-gray-900 pb-2 text-[#e94560]">
              Cart Summary
            </h2>
            <div className="flex pb-[30px] justify-between">
              <h4 className="text-base font-normal">Total Price :</h4>
              <h3 className="text-base font-medium text-[#e94560]">
                ₹{totalPrice}.00
              </h3>
            </div>
            <div className="bg-[#e94560] text-center py-2 px-4 rounded-md">
              <button className="text-white font-bold">Checkout</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailsCart;
