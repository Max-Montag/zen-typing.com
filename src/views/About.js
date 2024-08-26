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
import "./styles/scrollbar.css";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 bg-zinc-50">
      <Helmet>
        <title>Über zen-typing.com</title>
      </Helmet>
      <div className="absolute top-2 right-2">
        <Link to="/" className="text-zinc-700">
          <IoIosArrowRoundBack className="w-10 h-10 md:w-12 md:h-12" />
        </Link>
      </div>
      <div className="relative h-screen w-full overflow-y-scroll custom-scrollbar px-16 pb-36">
        <h1 className="text-5xl font-bold mb-8 text-center text-emerald-700">
          Willkommen bei Zen-Typing.com
        </h1>
        <p className="text-xl mb-8 text-center">
          Deine Oase der Ruhe im Meer des digitalen Chaos. 🧘‍♂️✨ Tauche ein in
          eine Welt, in der Speed Typing zur Meditation wird.
        </p>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            Die Vision
          </h2>
          <p className="mb-4">
            Die Idee hinter Zen-Typing ist, dass Tippen mehr sein kann als nur
            eine Notwendigkeit - es kann eine Form der Entspannung und des
            persönlichen Wachstums sein. Ich habe diese Plattform mit Liebe und
            Sorgfalt entwickelt, um dir einen Raum zu bieten, in dem du deine
            Tippfähigkeiten verbessern und gleichzeitig innere Ruhe finden
            kannst.
          </p>
          <p>
            Stell dir vor, du könntest deine Produktivität steigern und dabei
            Stress abbauen. Genau das ermöglicht dir Zen-Typing mit seiner
            einzigartigen Kombination aus Funktionalität und Ästhetik.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            Was macht Zen-Typing besonders?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <BsClock className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">Flexible Zeitoptionen</h3>
                <p>
                  Von kurzen 30-Sekunden-Sprints bis hin zu ausgedehnten
                  1-Stunden-Sessions - du bestimmst, wie lange du in deinen Flow
                  eintauchen möchtest. Und wenn du ganz im Moment sein willst,
                  schalte den Timer einfach aus und tippe so lange, wie es sich
                  für dich richtig anfühlt.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <IoMusicalNotes className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  Harmonische Klanglandschaft
                </h3>
                <p>
                  Jede korrekt getippte Silbe wird mit dem sanften Klang einer
                  Handpan in D-Moll belohnt. Diese einzigartige akustische
                  Rückmeldung schafft eine meditative Atmosphäre und motiviert
                  dich, im Fluss zu bleiben. Zusätzlich kannst du beruhigende
                  Hintergrundgeräusche wie Regen oder weißes Rauschen
                  aktivieren, um deine Konzentration zu fördern.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <BsKeyboard className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  Minimalistisches Design für maximalen Fokus
                </h3>
                <p>
                  Sobald du zu tippen beginnst, treten alle anderen Elemente der
                  Seite in den Hintergrund. Dieses Design ermöglicht es dir,
                  dich vollständig auf deine Worte zu konzentrieren.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <AiOutlineHeart className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">Werbefreie Zone</h3>
                <p>
                  Ich glaube an eine störungsfreie Erfahrung. Keine Werbung,
                  keine Ablenkungen - nur du und deine Worte. Zen-Typing ist
                  dein digitaler Rückzugsort, an dem du dich voll und ganz auf
                  deine Tippübungen konzentrieren kannst.
                </p>
              </div>
            </li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            Warum Zen-Typing?
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <GiBrain className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  Verbessere deine kognitiven Fähigkeiten
                </h3>
                <p>
                  Regelmäßiges Üben mit Zen-Typing schärft nicht nur deine
                  Tippfähigkeiten, sondern fördert auch deine Konzentration,
                  dein Gedächtnis und deine Multitasking-Fähigkeiten. Es ist
                  mentales Training verpackt in eine entspannende Aktivität.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <IoFlashOutline className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">
                  Steigere deine Produktivität
                </h3>
                <p>
                  Je schneller und genauer du tippen kannst, desto effizienter
                  wirst du in deinem Alltag und Beruf. Zen-Typing hilft dir,
                  deine Gedanken flüssiger in geschriebene Worte umzusetzen.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <FaRegSmile className="mr-4 text-emerald-500 flex-shrink-0 w-6 h-6" />
              <div>
                <h3 className="font-semibold text-lg">Reduziere Stress</h3>
                <p>
                  Die meditative Qualität des rhythmischen Tippens, kombiniert
                  mit beruhigenden Klängen, kann helfen, Stress abzubauen und
                  einen Zustand der Achtsamkeit zu erreichen.
                </p>
              </div>
            </li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            Unterstütze Zen-Typing
          </h2>
          <p className="mb-4">
            Zen-Typing ist mein persönliches Herzensprojekt, das ich vollständig
            werbefrei halte. Wenn du die Ruhe und den Fokus schätzt, den
            Zen-Typing dir bietet, würde ich mich über einen kleinen Beitrag
            sehr freuen.
          </p>
          <a
            href="https://buymeacoffee.com/maxmontag1j"
            className="inline-flex items-center bg-yellow-400 text-black px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors mb-6 text-lg font-semibold"
          >
            <FaCoffee className="mr-3 w-6 h-6" />
            Spendiere mir einen Kaffee
          </a>
          <p className="text-sm text-gray-600">
            Deine Unterstützung hilft mir, Zen-Typing weiterzuentwickeln und die
            Plattform werbefrei zu halten. Jeder Beitrag, egal wie klein, macht
            einen Unterschied und motiviert mich, das Projekt weiter zu
            verbessern.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-emerald-600">
            Open Source &amp; Mitwirkung
          </h2>
          <p className="mb-4">
            Zen-Typing ist ein Open-Source-Projekt, das ich ins Leben gerufen
            habe. Der gesamte Code ist öffentlich zugänglich, was bedeutet, dass
            du nicht nur von der Plattform profitierst, sondern auch die
            Möglichkeit hast, zu ihrer Entwicklung beizutragen.
          </p>
          <p className="mb-4">
            Hast du Ideen für neue Features? Möchtest du eigene Satzsammlungen
            beitragen? Oder bist du Entwickler und möchtest am Code mitwirken?
            Ich bin offen für Vorschläge und Beiträge. Schau dir das Projekt auf
            GitHub an und lass uns gemeinsam Zen-Typing noch besser machen!
          </p>
          <a
            href="https://github.com/Max-Montag/zen_typing_experience"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors text-lg font-semibold"
          >
            <FaGithub className="mr-3 w-6 h-6" />
            Zen-Typing auf GitHub
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
