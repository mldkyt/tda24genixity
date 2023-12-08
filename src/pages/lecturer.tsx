import { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Badge,
  Image,
  Container,
  Card,
} from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import styles from "../styles/lecturer.module.css";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { motion } from "framer-motion";
import FinalNavBar from "../components/NavBar";
import Head from "next/head";
import {
  Bookmark,
  CashStack,
  Envelope,
  GeoAlt,
  Telephone,
} from "react-bootstrap-icons";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
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

const tagsAnimationDuration = 500;

export default function LecturerTest(props: { lecturer: Required<Lecturer> }) {
  const fullName = `${props.lecturer.title_before} ${props.lecturer.first_name} ${props.lecturer.middle_name} ${props.lecturer.last_name} ${props.lecturer.title_after}`;
  const [_showAllTags, _setShowAllTags] = useState(false);

  const [_tagsAnimation, _setTagsAnimation] = useState("hidden");

  const hideAllTags = () => {
    _setShowAllTags(false);
    _setTagsAnimation("hiding");
    setTimeout(() => {
      _setTagsAnimation("hidden");
    }, tagsAnimationDuration);
  };

  const showAllTags = () => {
    _setShowAllTags(true);
    _setTagsAnimation("shown");
  };

  const formatTags = () => {
    return (
      <>
        {props.lecturer.tags.map((tag: Tag, index: number) => {
          if (index < 2) {
            return (
              <Badge key={tag.uuid} bg="secondary" className={styles.tag}>
                {tag.name}
              </Badge>
            );
          }

          return (
            <motion.div
              key={tag.uuid}
              animate={_tagsAnimation}
              variants={{
                hidden: { scale: 0, width: "0", position: "absolute" },
                hiding: { scale: 0, width: "0" },
                shown: { scale: 1, width: "auto" },
              }}
              transition={{
                duration: tagsAnimationDuration / 1000,
              }}
              initial={{ scale: 0, width: "0", position: "absolute" }}
            >
              <Badge key={tag.uuid} bg="secondary" className={styles.tag}>
                {tag.name}
              </Badge>
            </motion.div>
          );
        })}
        {_showAllTags || (
          <Badge
            key="showAllTags"
            className={styles.tagbutton}
            bg="primary"
            onClick={showAllTags}
          >
            Zobrazit všechny
          </Badge>
        )}
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

      <Container className="my-5">
        <FinalNavBar />
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <div className={styles.card}>
              <Image
                fluid
                roundedCircle
                src={props.lecturer.picture_url}
                alt={`Obrázek lektora ${fullName}`}
                className={styles.profileImage}
              />
              <h1 className={styles.fullName}>{fullName}</h1>
              <p className={styles.claim}>{props.lecturer.claim}</p>
            </div>
          </Col>
          <Col md={8}>
            <div className={styles.card}>
              <div className={styles.infoSection}>
                <p>
                  <GeoAlt /> {props.lecturer.location}
                </p>
                <p>
                  <CashStack /> {props.lecturer.price_per_hour} Kč/hod
                </p>
                <div className={styles.tagContainer}>
                  <Bookmark className="me-2" color="#0d6efd" />
                  {formatTags()}
                </div>
              </div>
              <div className={styles.bioSection}>
                <h2>O mně</h2>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                  {props.lecturer.bio}
                </ReactMarkdown>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <div className={`${styles.card} ${styles.contactCard}`}>
              <Card.Header className={styles.cardHeader}>Kontakt</Card.Header>
              <ListGroup variant="flush">
                {props.lecturer.contact.telephone_numbers.map((number) => (
                  <ListGroup.Item className={styles.listGroupItem} key={number}>
                    <Telephone />{" "}
                    <a className={styles.link} href={`tel:${number}`}>
                      {number}
                    </a>
                  </ListGroup.Item>
                ))}
                {props.lecturer.contact.emails.map((email) => (
                  <ListGroup.Item className={styles.listGroupItem} key={email}>
                    <Envelope />{" "}
                    <a className={styles.link} href={`mailto:${email}`}>
                      {email}
                    </a>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
