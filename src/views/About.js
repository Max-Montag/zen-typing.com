import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaCoffee, FaGithub } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";
import { BsClock, BsKeyboard } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoFlashOutline } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./../App.css";
import "./styles/scrollbar.css";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-zinc-50 raleway-normal">
      <Helmet>
        <title>{t("aboutPage.title")}</title>
      </Helmet>
      <div className="absolute top-2 right-2">
        <Link to="/" className="text-zinc-700">
          <IoIosArrowRoundBack className="w-10 h-10 md:w-12 md:h-12" />
        </Link>
      </div>
      <div className="relative h-screen w-full overflow-y-scroll custom-scrollbar px-4 md:px-16 pb-24">
        <h1 className="text-5xl font-bold mb-8 text-center text-emerald-700">
          {t("aboutPage.welcome")}
        </h1>
        <p className="text-xl mb-8 text-center">{t("aboutPage.intro")}</p>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            {t("aboutPage.vision")}
          </h2>
          <p className="mb-4">{t("aboutPage.visionText1")}</p>
          <p>{t("aboutPage.visionText2")}</p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            {t("aboutPage.features")}
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <BsClock className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t("aboutPage.feature1Title")}
                </h3>
                <p>{t("aboutPage.feature1Text")}</p>
              </div>
            </li>
            <li className="flex items-start">
              <IoMusicalNotes className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t("aboutPage.feature2Title")}
                </h3>
                <p>{t("aboutPage.feature2Text")}</p>
              </div>
            </li>
            <li className="flex items-start">
              <BsKeyboard className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t("aboutPage.feature3Title")}
                </h3>
                <p>{t("aboutPage.feature3Text")}</p>
              </div>
            </li>
            <li className="flex items-start">
              <AiOutlineHeart className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t("aboutPage.feature4Title")}
                </h3>
                <p>{t("aboutPage.feature4Text")}</p>
              </div>
            </li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            {t("aboutPage.whyZenTyping")}
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <GiBrain className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t("aboutPage.benefit1Title")}
                </h3>
                <p>{t("aboutPage.benefit1Text")}</p>
              </div>
            </li>
            <li className="flex items-start">
              <IoFlashOutline className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t("aboutPage.benefit2Title")}
                </h3>
                <p>{t("aboutPage.benefit2Text")}</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaRegSmile className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  {t("aboutPage.benefit3Title")}
                </h3>
                <p>{t("aboutPage.benefit3Text")}</p>
              </div>
            </li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            {t("aboutPage.support")}
          </h2>
          <p className="mb-4">{t("aboutPage.supportText1")}</p>
          <a
            href="https://buymeacoffee.com/maxmontag1j"
            className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors mb-6 text-lg font-semibold"
          >
            <FaCoffee className="mr-3 w-6 h-6" />
            {t("aboutPage.supportButton")}
          </a>
          <p className="text-sm text-gray-600">{t("aboutPage.supportText2")}</p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            {t("aboutPage.openSource")}
          </h2>
          <p className="mb-4">{t("aboutPage.openSourceText1")}</p>
          <p className="mb-4">{t("aboutPage.openSourceText2")}</p>
          <a
            href="https://github.com/Max-Montag/zen_typing_experience"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors text-lg font-semibold"
          >
            <FaGithub className="mr-3 w-6 h-6" />
            {t("aboutPage.githubButton")}
          </a>
        </section>
        <footer className="flex flex-col items-center justify-center">
          <Link
            to="/impressum"
            className="text-zinc-800 hover:text-zinc-400 transition-colors ease-in-out duration-200 text-sm"
          >
            {t("aboutPage.impressum")}
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
