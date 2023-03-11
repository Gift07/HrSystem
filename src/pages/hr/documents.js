import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import Loader from "../../components/loader";

const Documents = () => {
  const [loading, setLoading] = useState(false);
  const [firstAnime, setFirstAnime] = useState(false);
  const [secondAnime, setSecondAnime] = useState(false);

  const [userPermitted, setUserPermitted] = useState({});
  const Container = ({ title, content, color, link }) => {
    return (
      <div
        className="bg-white rounded overflow-hidden pb-2 m-2 shadow"
        style={{ width: 220 }}
      >
        <div
          className={`bg-${color}-500 `}
          style={{
            height: 2,
          }}
        />
        <div className="px-2 ">
          <div className="text-base font-semibold header my-1">{title}</div>
          <div className=" header font-bold text-gray-400 my-1">
            <div>{content}</div>
          </div>
          <a href={link} target="_blank" rel="noreferrer">
            <button
              className={`p-1 px-2 flex items-center rounded-lg bg-${color}-100 text-${color}-600 text-tiny`}
            >
              View
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </a>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);

      await axiosInstance.get("auth/single-user/").then((res) => {
        setUserPermitted(res.data[0]);
        setLoading(false);
        setTimeout(() => {
          setFirstAnime(true);
        }, 1000);
        setTimeout(() => {
          setSecondAnime(true);
        }, 100);
      });
    };

    dataFetch();
  }, []);

  useEffect(() => {
    if (userPermitted.is_staff === false) {
      window.location.href = "/";
    }
  }, [userPermitted]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="ml-2 md:ml-8 flex items-center ">
        <div
          className=" bg-gray-100 border-purple-400 absolute"
          style={{
            transition: "1s",
            height: secondAnime ? "40px" : "0",
            borderRightWidth: 3,
            width: firstAnime ? "0" : "330px",
          }}
        />
        <div
          className=" text-3xl text-gray-400 font-bold flex header items-center px-2"
          style={{
            opacity: firstAnime ? "1" : "0",
          }}
        >
          Company Documents
        </div>
      </div>
      <div className="flex flex-wrap ml-2 md:ml-8">
        <Container
          title="Certificate of Registration"
          content="12 Oct, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="Certificate of Incorporation"
          content="08 Dec, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="Tax Clearance"
          content="02 Mar, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="Business License"
          content="11 May, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="Basata"
          content="07 Jul, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="TCRA"
          content="07 Jul, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="WCF"
          content="07 Jul, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="NSSF"
          content="Tsh 12,000,000 /="
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="Zima Moto"
          content="07 Jul, 2021"
          color="purple"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="OSHA WASAFI FM"
          content="07 Jul, 2021"
          color="yellow"
          link="../../OSHAWASAFIFM.pdf"
        />
        <Container
          title="OSHA WASAFI TV"
          content="07 Jul, 2021"
          color="yellow"
          link="../../OSHAWASAFITV.pdf"
        />
        <Container
          title="OSHA WASAFI LIMITED"
          content="07 Jul, 2021"
          color="yellow"
          link="../../OSHAWCB.pdf"
        />
        <Container
          title="PayRoll"
          content="Tsh 30,000,000 /="
          color="pink"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="Salary Slip"
          content="07 Jul, 2021"
          color="pink"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
        <Container
          title="PAYE"
          content="Tsh 10,000,000 /="
          color="pink"
          link="https://buildmedia.readthedocs.org/media/pdf/django/latest/django.pdf"
        />
      </div>
    </div>
  );
};

export default Documents;
