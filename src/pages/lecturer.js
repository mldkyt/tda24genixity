import Head from "next/head";
import { Badge, Image } from "react-bootstrap";
import {
  Bookmark,
  CashStack,
  Envelope,
  GeoAlt,
  InfoCircle,
  Telephone,
} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import Markdown from "react-markdown";
import FinalNavBar from "@/components/NavBar";
import styles from "@/styles/lecturer.module.css";

/*
{
  "UUID": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
  "title_before": "Mgr.",
  "first_name": "Petra",
  "middle_name": "Swil",
  "last_name": "Plachá",
  "title_after": "MBA",
  "picture_url": "https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp",
  "location": "Brno",
  "claim": "Aktivní studentka / Předsedkyně spolku / Projektová manažerka",
  "bio": "<p>Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, <b>Tour de App</b> a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>",
  "tags": [
    {
      "uuid": "6d348a49-d16f-4524-86ac-132dd829b429",
      "name": "Dobrovolnictví"
    },
    {
      "uuid": "8e0568c3-e235-42aa-9eaa-713a2545ff5b",
      "name": "Studentské spolky"
    },
    {
      "uuid": "996c16c8-4715-4de6-9dd0-ea010b3f64c7",
      "name": "Efektivní učení"
    },
    {
      "uuid": "c20b98dd-f37e-4fa7-aac1-73300abf086e",
      "name": "Prezentační dovednosti"
    },
    {
      "uuid": "824cfe88-8a70-4ffb-bcb8-d45670226207",
      "name": "Marketing pro neziskové studentské projekty"
    },
    {
      "uuid": "fa23bea1-489f-4cb2-b64c-7b3cd7079951",
      "name": "Mimoškolní aktivity"
    },
    {
      "uuid": "8325cacc-1a1f-4233-845e-f24acfd0287b",
      "name": "Projektový management, event management"
    },
    {
      "uuid": "ba65a665-e141-40ab-bbd2-f4b1f2b01e42",
      "name": "Fundraising pro neziskové studentské projekty"
    }
  ],
  "price_per_hour": 1200,
  "contact": {
    "telephone_numbers": ["+420 722 482 974"],
    "emails": ["placha@scg.cz", "predseda@scg.cz"]
  }
}
*/

/**
 *
 * @param {import("next").GetServerSidePropsContext} ctx
 */
export async function getServerSideProps(ctx) {
  return {
    props: {
      lecturer: {
        UUID: "67fda282-2bca-41ef-9caf-039cc5c8dd69",
        title_before: "Mgr.",
        first_name: "Petra",
        middle_name: "Swil",
        last_name: "Plachá",
        title_after: "MBA",
        picture_url:
          "https://tourdeapp.cz/storage/images/2023_02_25/412ff296a291f021bbb6de10e8d0b94863fa89308843b/big.png.webp",
        location: "Brno",
        claim: "Aktivní studentka / Předsedkyně spolku / Projektová manažerka",
        bio: "<p>Baví mě organizovat věci. Ať už to bylo vyvíjení mobilních aplikací ve Futured, pořádání konferencí, spolupráce na soutěžích Prezentiáda, pIšQworky, <b>Tour de App</b> a Středoškolák roku, nebo třeba dobrovolnictví, vždycky jsem skončila u projektového managementu, rozvíjení soft-skills a vzdělávání. U studentských projektů a akcí jsem si vyzkoušela snad všechno od marketingu po logistiku a moc ráda to předám dál. Momentálně studuji Pdf MUNI a FF MUNI v Brně.</p>",
        tags: [
          {
            uuid: "6d348a49-d16f-4524-86ac-132dd829b429",
            name: "Dobrovolnictví",
          },
          {
            uuid: "8e0568c3-e235-42aa-9eaa-713a2545ff5b",
            name: "Studentské spolky",
          },
          {
            uuid: "996c16c8-4715-4de6-9dd0-ea010b3f64c7",
            name: "Efektivní učení",
          },
          {
            uuid: "c20b98dd-f37e-4fa7-aac1-73300abf086e",
            name: "Prezentační dovednosti",
          },
          {
            uuid: "824cfe88-8a70-4ffb-bcb8-d45670226207",
            name: "Marketing pro neziskové studentské projekty",
          },
          {
            uuid: "fa23bea1-489f-4cb2-b64c-7b3cd7079951",
            name: "Mimoškolní aktivity",
          },
          {
            uuid: "8325cacc-1a1f-4233-845e-f24acfd0287b",
            name: "Projektový management, event management",
          },
          {
            uuid: "ba65a665-e141-40ab-bbd2-f4b1f2b01e42",
            name: "Fundraising pro neziskové studentské projekty",
          },
        ],
        price_per_hour: 1200,
        contact: {
          telephone_numbers: ["+420 722 482 974"],
          emails: ["placha@scg.cz", "predseda@scg.cz"],
        },
      },
    },
  };
}

function formatBio(str) {
  str = str.replaceAll("<p>", "");
  str = str.replaceAll("</p>", "");
  str = str.replaceAll("<b>", "**");
  str = str.replaceAll("</b>", "**");
  str = str.replaceAll("<i>", "*");
  str = str.replaceAll("</i>", "*");
  str = str.replaceAll("<br>", "\n");
  return str;
}

export default function LecturerTest(props) {
  const fullName = `${props.lecturer.title_before} ${props.lecturer.first_name} ${props.lecturer.middle_name} ${props.lecturer.last_name} ${props.lecturer.title_after}`;
  const [_showAllTags, _setShowAllTags] = useState(false);

  const hideAllTags = () => {
    _setShowAllTags(false);
  };

  const showAllTags = () => {
    _setShowAllTags(true);
  };

  const formatTags = (tags, showAll) => {
    return (
      <>
        {props.lecturer.tags.map((tag, index) => {
          if (!_showAllTags && index == 2) {
            return (
              <>
                <Badge key={tag.uuid} bg="secondary" className={styles.tag}>
                  {tag.name}
                </Badge>
                <Badge
                  key="showAllTags"
                  className={styles.tagbutton}
                  onClick={showAllTags}
                >
                  Zobrazit všechny
                </Badge>
              </>
            );
          }
          if (!_showAllTags && index > 2) return null;
          return (
            <Badge key={tag.uuid} bg="secondary" className={styles.tag}>
              {tag.name}
            </Badge>
          );
        })}
        {_showAllTags && (
          <Badge
            key="hideAllTags"
            className={styles.tagbutton}
            bg="primary"
            onClick={hideAllTags}
          >
            Skrýt
          </Badge>
        )}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>{fullName}</title>
      </Head>

      <Container>
        <FinalNavBar />
        <Image
          roundedCircle
          width={64}
          height={64}
          src={props.lecturer.picture_url}
          alt={`Obrázek lektora ${fullName}`}
        />
        <span className={styles.fullname}>{fullName}</span>
        <br />
        <br />
        <span>
          <InfoCircle /> {props.lecturer.claim}
        </span>
        <br />
        <span>
          <GeoAlt /> {props.lecturer.location}
        </span>
        <br />
        <span>
          <CashStack /> {props.lecturer.price_per_hour} Kč/hod
        </span>
        <div>
          <Bookmark />
          {formatTags(props.lecturer.tags, _showAllTags)}
        </div>

        <h3 style={{ marginTop: "1em" }}>O mně</h3>
        <Markdown>{formatBio(props.lecturer.bio)}</Markdown>
        <h3>Kontakt</h3>
        <p>
          {props.lecturer.contact.telephone_numbers.map((number) => (
            <a href={`tel:${number}`}>
              <Telephone className={styles.contact} />
              {number}
            </a>
          ))}
        </p>
        <p>
          {props.lecturer.contact.emails.map((email) => (
            <a style={{ marginRight: "1em" }} href={`mailto:${email}`}>
              <Envelope className={styles.contact} />
              {email}
            </a>
          ))}
        </p>
      </Container>
    </>
  );
}
