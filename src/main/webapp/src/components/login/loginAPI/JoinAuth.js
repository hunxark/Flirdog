import React, { useEffect, useState } from "react";

import login from "../../../css/login/login.module.css";
import { Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import EmailInput from "../join/EmailInput";
import PwdCheckInput from "../join/PwdCheckInput";
import PwdInput from "../join/PwdInput";
import AddressSearch from "../join/AddressSearch";
import PetInfo from "../join/PetInfo";
import PetAiImage from "../join/PetAiImage";
import Swal from "sweetalert2";
import PetImage from "../join/PetImage";
import translateText from "../translateText";
import PetModal from "../join/PetModal";

const JoinAuth = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
    addressDetail: "",
  });
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [isClickNext, setIsClickNext] = useState(false);
  const [isClickNext2, setIsClickNext2] = useState(false);
  const [isClickNext3, setIsClickNext3] = useState(false);
  const [isClickNext4, setIsClickNext4] = useState(false);
  const [isClickNext5, setIsClickNext5] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [satisfyAllCondition, setSatisfyAllCondition] = useState(false);
  const [satisfyAllConditionPetInfo, setSatisfyAllConditionPetInfo] =
    useState(false);

  const [selectedBreed, setSelectedBreed] = useState("선택");
  const [modalShow, setModalShow] = useState(false);

  const [imgFiles, setImgFiles] = useState("");
  const [aiDogProfileImgUrl, setAiDogProfileImgUrl] = useState("");

  const [image, setImage] = useState("");
  const [imageAi, setImageAi] = useState("");
  const [dogsInfo, setDogsInfo] = useState({
    name: "",
    age: "",
    gender: "",
    isNeutralized: false,
  });
  const [dogsBreed, setDogsBreed] = useState("");
  const [dogsColor, setDogsColor] = useState("");
  useEffect(
    (e) => {
      setUser({
        ...user,
        email: email,
        password: password,
        name: user.name,
        phone: phone,
        address: address,
        addressDetail: addressDetail,
      });
    },
    [
      address,
      addressDetail,
      email,
      password,
      passwordCheck,
      address,
      addressDetail,
    ]
  );

  useEffect(() => {
    console.log(user);
  }, [user]);
  useEffect(() => {
    console.log("dogsBreed");
    console.log(dogsBreed);

    // 이미지생성로직
    if (dogsBreed !== "") {
      fetchData();
    }
  }, [dogsBreed]);
  useEffect(() => {
    console.log("PetInfo3PetGender");
    console.log("dogsInfo: ", dogsInfo);
  }, [dogsInfo]);

  useEffect(() => {
    if (
      isValidEmail &&
      isValidPassword &&
      isPasswordMatch &&
      address !== "" &&
      addressDetail.length > 0
    ) {
      setSatisfyAllCondition(true);
    } else {
      setSatisfyAllCondition(false);
    }
  }, [isValidEmail, isValidPassword, isPasswordMatch, address, addressDetail]);

  const handleInputChange = (field) => (e) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const handleSendAuthCode = async () => {
    if (!isValidPhoneNumber(phone)) {
      Swal.fire({
        icon: "error",
        title: "휴대폰 번호 형식을 확인해주세요",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      return;
    }
    if (user.name === "") {
      Swal.fire({
        icon: "error",
        title: "이름을 입력해주세요",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      return;
    }

    setIsClickNext(true);
  };

  const handleSendAuthCode2 = () => {
    if (!satisfyAllCondition) {
      Swal.fire({
        icon: "error",
        title: "모든 정보를 입력해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    setIsClickNext2(true);
  };
  const handleSendAuthCode3 = () => {
    if (selectedBreed !== "선택") {
      setIsClickNext3(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "정확한 견종을 선택해주세요",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleSendAuthCode4 = () => {
    setIsClickNext4(true);
  };

  const isValidPhoneNumber = (number) => {
    const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    return regex.test(number);
  };
  const onAcceptAiImage = () => {
    setImageAi(aiDogProfileImgUrl);
    setModalShow(true);
    // Swal.fire({
    //   icon: "success",
    //   title: "회원가입이 완료되었습니다!",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  };

  const onAcceptImage = () => {
    setImage(imgFiles);
    setIsClickNext5(true);
  };

  //--------------------이미지 생성------------------------
  const fetchData = async () => {
    console.log("JoinAuth.js ,NCP 파파고 번역 api 작동시작");
    const dogsColorTranslated = await translateText(dogsColor);

    const prompt = `Draw a cute Korean-style puppy (kind of ${dogsBreed}) character. The color is ${dogsColorTranslated}.`;
    console.log("prompt: ", prompt);

    console.log("JoinAuth.js, 이미지 생성 시작");
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
          },
        }
      );

      const imageUrl = response.data.data[0].url; // Adjust this according to the actual response structure
      setAiDogProfileImgUrl(imageUrl);
      // alert("Saving image...");

      await axios
        .post("http://localhost:8080/chatGPT/downloadAndSaveImage", null, {
          params: {
            imageUrl: imageUrl,
          },
        })
        .then((res) => {
          console.log("JoinAuth.js, 이미지 저장 성공!.");
          alert(res.data);
        })
        .catch((error) => {
          console.log("JoinAuth.js, 이미지 저장 실패.");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      console.error("Error fetching image:", error);
      alert("Failed to fetch image.");
    }
  };

  const goJoinComplete = () => {
    // axios.post("http://localhost:8080/join",
  };
  //------------------------------------------------------------
  return (
    <>
      <div
        className={`${login.loginForm} ${
          isClickNext ? login.slideOutLeft : ""
        }  justify-content-start align-items-center flex-column`}
      >
        <div
          className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
        >
          {/* fontsize를 조절하는 부트스트랩 */}
          <div
            className={`${login.loginFormElementDiv} mt-4 d-flex justify-content-center align-items-center`}
          ></div>
          <span className={login.JoinAuthFont1}>기본 정보 입력</span>
          <span className={`${login.JoinAuthFont2} mt-3`}>
            원활한 서비스 제공을 위해, 정보를 입력해주세요.
          </span>
          <div
            style={{ width: "100%" }}
            className={`d-flex justhfi-content-start`}
          >
            <span className={`${login.JoinAuthFont3} mt-3`}>휴대폰번호</span>
          </div>
        </div>
        <div
          className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
        >
          <InputGroup size="lg" className={`mt-2`}>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="휴대폰번호"
              onChange={(e) => {
                handleInputChange("phone");
                setPhone(e.target.value);
              }}
            />
          </InputGroup>
        </div>

        <div
          className={`${login.joinAuthForm} d-flex justify-content-start align-items-center flex-column`}
        >
          <div
            style={{ width: "100%" }}
            className={`d-flex justhfi-content-start`}
          >
            <span className={`${login.JoinAuthFont3} mt-3`}>이름</span>
          </div>
        </div>
        <div
          className={`${login.loginFormElementDiv} ${login.inputStyle} mt-2 d-flex justify-content-center align-items-center`}
        >
          <InputGroup size="lg" className={`mt-2`}>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-lg"
              placeholder="이름을 입력하세요."
              onChange={(e) => {
                handleInputChange("name")(e);
              }}
            />
          </InputGroup>
        </div>
        <div
          className={`${
            login.loginFormElementDiv
          } mt-2 d-flex justify-content-center align-items-center rounded ${
            isValidPhoneNumber(phone) ? login.loginBtn : login.disabledBtn
          }`}
          onClick={handleSendAuthCode}
        >
          <span className={login.loginBtnSpan}>다음</span>
        </div>
      </div>
      {isClickNext && (
        <div
          className={`${login.loginForm} ${
            isClickNext ? login.slideInRight : ""
          } 
          ${isClickNext2 ? login.slideOutLeft : ""}
          d-flex justify-content-start align-items-center flex-column`}
        >
          <EmailInput
            setEmail={setEmail}
            isValidEmail={isValidEmail}
            setIsValidEmail={setIsValidEmail}
          ></EmailInput>
          <PwdInput
            setPassword={setPassword}
            isValidPassword={isValidPassword}
            setIsValidPassword={setIsValidPassword}
          ></PwdInput>
          <PwdCheckInput
            setPasswordCheck={setPasswordCheck}
            passwordCheck={passwordCheck}
            password={password}
            isPasswordMatch={isPasswordMatch}
            setIsPasswordMatch={setIsPasswordMatch}
          ></PwdCheckInput>
          <AddressSearch
            address={address}
            setAddress={setAddress}
            setAddressDetail={setAddressDetail}
          ></AddressSearch>

          <div
            className={`${
              login.loginFormElementDiv
            } mt-2 d-flex justify-content-center align-items-center rounded ${
              satisfyAllCondition ? login.loginBtn : login.disabledBtn
            }`}
            onClick={handleSendAuthCode2}
          >
            <span className={login.loginBtnSpan}>다음</span>
          </div>
        </div>
      )}
      {isClickNext2 && (
        <>
          <div
            className={`${login.loginForm} ${
              isClickNext2 ? login.slideInRight : ""
            } 
          ${isClickNext3 ? login.slideOutLeft : ""}
          d-flex justify-content-start align-items-center flex-column`}
          >
            <PetInfo
              dogsInfo={dogsInfo}
              setDogsInfo={setDogsInfo}
              dogsBreed={dogsBreed}
              setDogsBreed={setDogsBreed}
              setDogsColor={setDogsColor}
              selectedBreed={selectedBreed}
              setSelectedBreed={setSelectedBreed}
            ></PetInfo>
            <div
              className={`${login.loginFormElementDiv} mt-2 d-flex justify-content-center align-items-center rounded ${login.loginBtn}`}
              onClick={handleSendAuthCode3}
            >
              <span className={login.loginBtnSpan}>등록</span>
            </div>
            <div
              className={`
              ${login.loginFormElementDivSmall}
              ${login.loginFormElementLater}
              mt-2 d-flex justify-content-center align-items-center rounded `}
              onClick={handleSendAuthCode3}
            >
              <span style={{ color: "#fe7394" }}>나중에 할래요</span>
            </div>
          </div>
        </>
      )}
      {isClickNext3 && (
        <div
          className={`${login.loginForm} ${
            isClickNext3 ? login.slideInRight : ""
          }
          ${isClickNext4 ? login.slideOutLeft : ""}
           d-flex justify-content-start align-items-center flex-column`}
        >
          <div style={{ height: 50 }}></div>
          <span className={`${login.JoinAuthFont4} ${login.underlinStyle}`}>
            아이콘을 눌러 실제 반려동물 사진을 등록해주세요.
          </span>

          <PetImage
            imgFiles={imgFiles}
            setImgFiles={setImgFiles}
            login={login}
            onAcceptImage={onAcceptImage}
          ></PetImage>

          <div
            className={`${login.loginFormElementDiv} mt-4 d-flex justify-content-center align-items-center rounded ${login.loginBtn}`}
            onClick={handleSendAuthCode4}
          >
            <span className={`${login.loginBtnSpan}  `}>등록하기</span>
          </div>
          <div
            className={`
            ${login.loginFormElementDivSmall}
            ${login.loginFormElementLater}
            mt-2 d-flex justify-content-center align-items-center rounded `}
            onClick={goJoinComplete}
          >
            <span style={{ color: "#fe7394" }}>나중에 할래요</span>
          </div>
        </div>
      )}
      {isClickNext4 && (
        <div
          className={`${login.loginForm} ${
            isClickNext4 ? login.slideInRight : ""
          } d-flex justify-content-start align-items-center flex-column`}
        >
          <div style={{ height: 35 }}></div>
          <span className={login.JoinAuthFont1}>
            내 강아지 정보를 토대로 하나뿐인 Ai 캐릭터를 만들었어요.
          </span>
          <span>커뮤니티에서 활동할 때 쓰일 나만의 프로필 이미지에요!</span>
          <PetAiImage
            aiDogProfileImgUrl={aiDogProfileImgUrl}
            setAiDogProfileImgUrl={setAiDogProfileImgUrl}
            dogsInfo={dogsInfo}
            login={login}
            onAcceptAiImage={onAcceptAiImage}
          ></PetAiImage>
          {modalShow && (
            <PetModal
              modalShow={modalShow}
              setModalShow={setModalShow}
            ></PetModal>
          )}
        </div>
      )}
    </>
  );
};

export default JoinAuth;
