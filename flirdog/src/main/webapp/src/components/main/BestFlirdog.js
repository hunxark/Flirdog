import React from "react";
import BestFlirdogImg from "./BestFlirdogImg";
import NavigateBtn from "./NavigateBtn";

const BestFlirdog = () => {
  return (
    <>
      <div className="row mt-10 mx-2">
        <div className="col-12">
          <img
            className="bestFlirdogTitle"
            src="/image/main/bestFlirdog1.png"
          />
        </div>
      </div>
      <div className="row mt-8">
        <div
          className="col-3 d-flex justify-content-center align-items-center
        rankingBtn pinkDivColor "
        >
          <span>전국 랭킹</span>
        </div>
        <div
          className="col-3 d-flex justify-content-center align-items-center
        rankingBtn whiteDivColor"
        >
          <span>지역 랭킹</span>
        </div>
      </div>
      <div className="row mt-8 d-flex justify-content-between">
        <BestFlirdogImg srcImg="/image/main/dog1.jpg" text="999" />
        <BestFlirdogImg srcImg="/image/main/dog2.jpg" text="784" />
        <BestFlirdogImg srcImg="/image/main/dog3.jpg" text="654" />
      </div>
      <div className="navigateBtnContainer mt-8">
        <NavigateBtn
          text="등록하러 가기"
          url="/"
          fontSize="2.5vw"
          btnWidth="40vw"
          btnHeight="12vh "
        ></NavigateBtn>
      </div>
    </>
  );
};

export default BestFlirdog;
