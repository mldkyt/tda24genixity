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
import styles from "../../styles/lecturer.module.css";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { motion } from "framer-motion";
import FinalNavBar from "../../components/NavBar";
import Head from "next/head";
import {
    Bookmark,
    CashStack,
    Envelope,
    GeoAlt,
    Telephone,
} from "react-bootstrap-icons";
import { getLecturer } from "../../components/lecturers";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { uuid } = ctx.params as { uuid: string };
    if (!uuid) {
        return {
            notFound: true
        }
    }

    let lecturer = getLecturer(uuid);
    if (!lecturer) {
        return {
            notFound: true
        }
    }

    if (!lecturer.tags) {
        lecturer.tags = [];
    }

    if (!lecturer.contact) {
        lecturer.contact = {
            emails: [],
            telephone_numbers: []
        }
    }

    return {
        props: {
            lecturer,
        },
    };
}

const tagsAnimationDuration = 500;

export default function LecturerTest(props: { lecturer: any }) {
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
                                {props.lecturer.contact.telephone_numbers.map((number: any) => (
                                    <ListGroup.Item className={styles.listGroupItem} key={number}>
                                        <Telephone />{" "}
                                        <a className={styles.link} href={`tel:${number}`}>
                                            {number}
                                        </a>
                                    </ListGroup.Item>
                                ))}
                                {props.lecturer.contact.emails.map((email: any) => (
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
