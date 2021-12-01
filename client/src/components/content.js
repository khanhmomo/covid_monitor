const Content = ({ title }) => (
  
    <div className="max-w-full bg-gray-800 py-6 px-6 rounded-3xl">
      <div className="flex justify-between text-white items-center mb-8">
        <p className="text-2xl font-bold">Asian Covid-19 Monitor</p>
        <p id="date"></p>
      </div>
      <div className="flex flex-wrap justify-between items-center pb-8">
        <div className="flex flex-wrap text-white">
          <div className="pr-10">
            <div className="text-2xl font-bold">45</div>
            <div className="">Total Infected</div>
          </div>
          <div className="pr-10">
            <div className="text-2xl font-bold">24</div>
            <div className="">Total Healed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">62</div>
            <div className="">Total Death</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div
              className="p-4 rounded-3xl"
              style={{ backgroundColor: '#FF3333' }}
            >
              <div className="flex items-center justify-b">
                <span className="text-sm">Today</span>
              </div>
              <div className="mb-4 mt-5">
                <p className="text-base text-2xl font-bold opacity-70">Vietnam</p>
              </div>
              <div class="row">
                <p className="text-sm font-bold m-0">Infected</p>
                <p className="text-right m-0 text-sm font-bold">6000</p>
              </div>
              <div >
                <p className="text-sm font-bold m-0 col-md-6">Healed</p>
                <p className="text-right m-0 text-sm font-bold col-md-6">200</p>
              </div>
              <div>
                <p className="text-sm font-bold m-0">Death</p>
                <p className="text-right m-0 text-sm font-bold">300</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="p-4 rounded-3xl bg-gray-300">
            <div className="flex items-center justify-b">
                <span className="text-sm">Today</span>
              </div>
              <div className="mb-4 mt-5">
                <p className="text-base text-2xl font-bold opacity-70">Indonesia</p>
              </div>
              <div class="row">
                <p className="text-sm font-bold m-0">Infected</p>
                <p className="text-right m-0 text-sm font-bold">6000</p>
              </div>
              <div >
                <p className="text-sm font-bold m-0 col-md-6">Healed</p>
                <p className="text-right m-0 text-sm font-bold col-md-6">200</p>
              </div>
              <div>
                <p className="text-sm font-bold m-0">Death</p>
                <p className="text-right m-0 text-sm font-bold">300</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="p-2">
            <div className="p-4 rounded-3xl bg-green-200">
            <div className="flex items-center justify-b">
                <span className="text-sm">Today</span>
              </div>
              <div className="mb-4 mt-5">
                <p className="text-base text-2xl font-bold opacity-70">Malaysia</p>
              </div>
              <div class="row">
                <p className="text-sm font-bold m-0">Infected</p>
                <p className="text-right m-0 text-sm font-bold">6000</p>
              </div>
              <div >
                <p className="text-sm font-bold m-0 col-md-6">Healed</p>
                <p className="text-right m-0 text-sm font-bold col-md-6">200</p>
              </div>
              <div>
                <p className="text-sm font-bold m-0">Death</p>
                <p className="text-right m-0 text-sm font-bold">300</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

);

export default Content;
