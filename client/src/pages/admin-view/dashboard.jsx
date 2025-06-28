import { Facebook } from "lucide-react";
import { useSelector } from "react-redux";

function AdminDashboard() {

    const {productList} =useSelector(state=>state.shopProducts) 
    console.log("🚀 ~ AdminDashboard ~ productList:", productList.length)

    const {user} = useSelector(state=>state.auth)
    console.log("🚀 ~ AdminDashboard ~ users:", user)
  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-4 md:col-span-6">
            <div className="card shadow bg-white rounded rounded-md">
              <div className="flex justify-between text-2xl card-header !pb-0 !border-b-0">
                <h5>Total <br /> Products</h5>
                <p className="mb-0">{productList.length}</p>

              </div>
              <div className="card-body">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="font-light flex items-center mb-0">
                    <i className="feather icon-arrow-up text-success-500 text-[30px] mr-1.5"></i>
                    {/* $ 249.95 */}
                  </h3>
                </div>
                {/* <div className="w-full bg-theme-bodybg rounded-lg h-1.5 mt-6 dark:bg-themedark-bodybg">
                  <div
                    className="bg-theme-bg-1 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                    role="progressbar"
                    style={{ width: "75%" }}
                  ></div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4 md:col-span-6">
            <div className="card shadow bg-white rounded rounded-md">
              <div className="flex justify-between text-2xl card-header !pb-0 !border-b-0">
                <h5>Our <br /> Users</h5>
                
                  <p className="mb-0">5
                  </p>
              </div>
              {/* <div className="card-body">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="font-light flex items-center mb-0">
                    <i className="feather icon-arrow-down text-danger-500 text-[30px] mr-1.5"></i>
                    $ 2.942.32
                  </h3>
                </div>
                <div className="w-full bg-theme-bodybg rounded-lg h-1.5 mt-6 dark:bg-themedark-bodybg">
                  <div
                    className="bg-theme-bg-2 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                    role="progressbar"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <div className="card shadow bg-white rounded rounded-md">
              <div className="card-header !pb-0 !border-b-0">
                <h5>Yearly Sales</h5>
              </div>
              <div className="card-body">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h3 className="font-light flex items-center mb-0">
                    <i className="feather icon-arrow-up text-success-500 text-[30px] mr-1.5"></i>
                    ₹8.638.32
                  </h3>
                  <p className="mb-0">80%</p>
                </div>
                <div className="w-full bg-theme-bodybg rounded-lg h-1.5 mt-6 dark:bg-themedark-bodybg">
                  <div
                    className="bg-theme-bg-1 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                    role="progressbar"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <div className="card shadow bg-white rounded rounded-md">
              <div className="card-body border-b border-theme-border dark:border-themedark-border">
                <div className="flex items-center justify-center">
                  <div className="shrink-0">
                    <i className="fab fa-facebook-f text-primary-500 text-[36px]"></i>
                    {/* <Facebook color="blue" size={30}/> */}
                  </div>
                  <div className="grow ltr:text-right rtl:text-left">
                  <h2 style={{color:"blue",fontWeight:"bold"}}>Facebook</h2>
                    <h3 className="mb-2">12,281</h3>
                    <h5 className="text-success-500 mb-0">
                      +7.2% <span className="text-muted-foreground">Total Likes</span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-12 gap-x-6">
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted-foreground m-r-5">Target:</span>35,098
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-theme-bg-1 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted-foreground m-r-5">Duration:</span>350
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-theme-bg-2 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-span-12 xl:col-span-4 md:col-span-6">
            <div className="card shadow bg-white rounded rounded-md">
              <div className="card-body border-b border-theme-border dark:border-themedark-border">
                <div className="flex items-center justify-center">
                  <div className="shrink-0">
                    <i className="fab fa-twitter text-primary-500 text-[36px]"></i>
                  </div>
                  <div className="grow ltr:text-right rtl:text-left">
                    <h3 className="mb-2">11,200</h3>
                    <h5 className="text-purple-500 mb-0">
                      +6.2% <span className="text-muted">Total Likes</span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-12 gap-x-6">
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted m-r-5">Target:</span>34,185
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-success-500 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted m-r-5">Duration:</span>800
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-primary-500 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-span-12 xl:col-span-4 md:col-span-6">
            <div className="card shadow bg-white rounded rounded-md">
              <div className="card-body border-b border-theme-border dark:border-themedark-border">
                <div className="flex items-center justify-center">
                  <div className="shrink-0">
                    <i className="fab fa-google-plus-g text-danger-500 text-[36px]"></i>
                  </div>
                  <div className="grow ltr:text-right rtl:text-left">
                                    <h2 className="text-blue-500" style={{fontWeight:"bold"}}>Twiter</h2>

                    <h3 className="mb-2">10,500</h3>
                    <h5 className="text-purple-500 mb-0">
                      +5.9% <span className="text-muted-foreground">Total Likes</span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-12 gap-x-6">
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted-foreground m-r-5">Target:</span>25,998
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-theme-bg-1 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted-foreground m-r-5">Duration:</span>900
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-theme-bg-2 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: " 50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-4 md:col-span-6">
            <div className="card shadow bg-white rounded rounded-md">
              <div className="card-body border-b border-theme-border dark:border-themedark-border">
                <div className="flex items-center justify-center">
                  <div className="shrink-0">
                    <i className="fab fa-google-plus-g text-danger-500 text-[36px]"></i>
                  </div>
                  <div className="grow ltr:text-right rtl:text-left">
                                    <h2 className="text-pink-700" style={{fontWeight:"bold"}}>Instagram</h2>

                    <h3 className="mb-2">10,500</h3>
                    <h5 className="text-purple-500 mb-0">
                      +5.9% <span className="text-muted-foreground">Total Likes</span>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-12 gap-x-6">
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted-foreground m-r-5">Target:</span>25,998
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-theme-bg-1 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: "80%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <h6 className="text-center mb-2.5">
                      <span className="text-muted-foreground m-r-5">Duration:</span>900
                    </h6>
                    <div className="w-full bg-theme-bodybg rounded-lg h-1.5 dark:bg-themedark-bodybg">
                      <div
                        className="bg-theme-bg-2 h-full rounded-lg shadow-[0_10px_20px_0_rgba(0,0,0,0.3)]"
                        role="progressbar"
                        style={{ width: " 50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
