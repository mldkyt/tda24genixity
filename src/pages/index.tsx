import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { GetServerSidePropsContext } from 'next'
import { Badge, Button, CloseButton, Container, Form, FormControl, Modal } from 'react-bootstrap'
import { getLecturers } from '../components/lecturers'
import { GeoAlt, CashStack, X } from 'react-bootstrap-icons';
import styles from '../styles/index.module.css'

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const lecturers = getLecturers();

  let validTags: string[] = [];
  let validLocations: string[] = [];
  lecturers.forEach(x => {
    if (x.tags) {
      x.tags.forEach(x => {
        if (!validTags.includes(x.name)) {
          validTags.push(x.name);
        }
      })
    }

    if (x.location && !validLocations.includes(x.location)) {
      validLocations.push(x.location);
    }
  })

  validTags.sort((a, b) => a.localeCompare(b));
  validLocations.sort((a, b) => a.localeCompare(b));

  return {
    props: {
      lecturers,
      validTags,
      validLocations
    }
  }
}


export default function Home(props: Readonly<{ lecturers: Lecturer[], validTags: string[], validLocations: string[] }>) {

  const [filterMenu, setFilterMenu] = useState(false);

  const [sortBy, setSortBy] = useState('');

  const [filterPrice, setFilterPrice] = useState({ enabled: false, min: 0, max: 0 });
  const [filterTags, setFilterTags] = useState({ enabled: false, tags: [] } as { enabled: boolean, tags: string[] });
  const [filterLocation, setFilterLocation] = useState({ enabled: false, locations: [] } as { enabled: boolean, locations: string[] });
  const [filterFullText, setFilterFullText] = useState({ enabled: false, search: "" });

  const [pageExtend, setPageExtend] = useState(0);
  const [showShowMoreBtn, setShowShowMoreBtn] = useState(true);

  function renderLecturers() {
    let i = 0;

    switch (sortBy) {
      case "namedesc":
        props.lecturers.sort((a, b) => {
          return a.first_name.localeCompare(b.first_name);
        })
        break;
      case "nameasc":
        props.lecturers.sort((a, b) => {
          return b.first_name.localeCompare(a.first_name);
        });
        break;
      case "pricedesc":
        props.lecturers.sort((a, b) => {
          if (!a.price_per_hour) a.price_per_hour = 0;
          if (!b.price_per_hour) b.price_per_hour = 0;
          return a.price_per_hour - b.price_per_hour;
        });
        break;
      case "priceasc":
        props.lecturers.sort((a, b) => {
          if (!a.price_per_hour) a.price_per_hour = 0;
          if (!b.price_per_hour) b.price_per_hour = 0;
          return b.price_per_hour - a.price_per_hour;
        });
        break;
    }

    const things = props.lecturers.map(x => {
      if (filterFullText.enabled && !x.first_name.toLowerCase().includes(filterFullText.search.toLowerCase()) && !x.last_name?.toLowerCase().includes(filterFullText.search.toLowerCase()) && !x.bio?.toLowerCase().includes(filterFullText.search.toLowerCase()) && !x.claim?.toLowerCase().includes(filterFullText.search.toLowerCase()) && !x.middle_name?.toLowerCase().includes(filterFullText.search.toLowerCase()) && !x.title_before?.toLowerCase().includes(filterFullText.search.toLowerCase()) && !x.title_after?.toLowerCase().includes(filterFullText.search.toLowerCase())) {
        return null;
      }
      if (filterPrice.enabled && x.price_per_hour != undefined) {
        if (filterPrice.min != 0 && x.price_per_hour < filterPrice.min) {
          return null;
        }
        if (filterPrice.max != 0 && x.price_per_hour > filterPrice.max) {
          return null;
        }
      }
      if (filterTags.enabled && x.tags != undefined) {
        let passed = filterTags.tags.length > 0;
        filterTags.tags.forEach(y => {
          if (!x.tags?.map(x => x.name).includes(y)) {
            passed = false;
          }
        });
        if (!passed) return null
      }
      if (filterLocation.enabled && x.tags != undefined) {
        let passed = filterLocation.locations.length > 0;
        filterLocation.locations.forEach(y => {
          if (x.location != y) {
            passed = false;
          }
        });
        if (!passed) return null
      }

      if (i > pageExtend * 10 + 10) {
        return null;
      }
      i++;

      const fullName = `${x.title_before ?? ""} ${x.first_name} ${x.middle_name ?? ""} ${x.last_name} ${x.title_after ?? ""}`;
      return <a href={`/lecturer/${x.uuid}`} key={x.uuid} style={{
        textDecoration: 'none',
        color: 'inherit'
      }}>
        <div key={x.uuid} className={styles.lecturerbox}>
          <div className={styles.lecturerimagediv}>
            {x.picture_url && <img src={x.picture_url} alt={fullName} width={96} className={styles.lecturerimage}></img>}
          </div>
          <span className={styles.lecturername}>{fullName}</span>
          <p className={styles.lecturerclaim}>
            {x.claim}
          </p>
          <p>
            {x.location && <><GeoAlt /> {x.location}</>} {x.price_per_hour && <><CashStack /> {x.price_per_hour} kč/h</>}
          </p>
          <p className={styles.lecturerbadges}>
            {x.tags?.map(x => {
              return <Badge key={x.uuid} bg='secondary' className={styles.lecturerbadge}>
                {x.name}
              </Badge>
            })}
          </p>
        </div>
      </a>
    })

    const showShowMoreBtnNewState = i > pageExtend * 10 + 10;
    if (showShowMoreBtnNewState != showShowMoreBtn) {
      setShowShowMoreBtn(showShowMoreBtnNewState);
    }

    return things;
  }

  return (
    <main>
      <NavBar />
      <Container>
        <div style={{
          float: 'left',
          width: '150px'
        }}>
        </div>
        <div className={styles.searchoptions}>
          <Button onClick={() => setFilterMenu(true)} style={{
            marginBottom: '4px'
          }}>Filtry...</Button>
          <Form.Select className={styles.sortbydropdown} placeholder='Seřadit podle...' value={sortBy} onChange={x => setSortBy(x.currentTarget.value)}>
            <option value="">Seřadit podle...</option>
            <option value="namedesc">Jméno A-Z</option>
            <option value="nameasc">Jméno Z-A</option>
            <option value="pricedesc">Cena ↑</option>
            <option value="priceasc">Cena ↓</option>
          </Form.Select>
        </div>
        <div>
          {renderLecturers()}
        </div>
        <div>
          {showShowMoreBtn && <Button onClick={() => {
            setPageExtend(pageExtend + 1);
          }}>Zobrazit další</Button>}
        </div>

        <Modal show={filterMenu} onHide={() => setFilterMenu(false)}>
          <Modal.Header>
            Nastavení filtrů
            <CloseButton onClick={() => setFilterMenu(false)} />
          </Modal.Header>
          <Modal.Body>
            <h2>Text</h2>
            <Form.Check type='switch' checked={filterFullText.enabled} onChange={x => setFilterFullText({ ...filterFullText, enabled: x.currentTarget.checked })} label="Zapnout filtr"></Form.Check>
            <p>Hledá ve jméně, claimu a v biu.</p>
            <FormControl type='text' value={filterFullText.search} onChange={x => setFilterFullText({ ...filterFullText, search: x.currentTarget.value })}></FormControl>

            <h2>Cena</h2>
            <Form.Check type='switch' checked={filterPrice.enabled} onChange={x => setFilterPrice({ ...filterPrice, enabled: x.currentTarget.checked })} label="Zapnout filtr"></Form.Check>

            <span>Minimum</span>
            <FormControl type='number' min={0} value={filterPrice.min} onChange={x => setFilterPrice({ ...filterPrice, min: Number(x.currentTarget.value) })}></FormControl>

            <span>Maximum</span>
            <FormControl type='number' min={0} value={filterPrice.max} onChange={x => setFilterPrice({ ...filterPrice, max: Number(x.currentTarget.value) })}></FormControl>

            <h2>Štítky</h2>
            <Form.Check type='switch' checked={filterTags.enabled} onChange={x => setFilterTags({ ...filterTags, enabled: x.currentTarget.checked })} label="Zapnout filtr"></Form.Check>
            {filterTags.tags.map(x => {
              function remove() {
                let newTags: string[] = [];
                filterTags.tags.forEach(y => { if (x != y) newTags.push(y); });
                setFilterTags({ ...filterTags, tags: newTags });
              }

              return <Badge bg='secondary' key={x}>
                <X onClick={remove} style={{ cursor: 'pointer' }} /> {x}
              </Badge>
            })}
            <p></p>
            <Form.Select value={""} onChange={x => setFilterTags({ ...filterTags, tags: [...filterTags.tags, x.currentTarget.value] })}>
              <option>Vybrat štítek pro přidání</option>
              {props.validTags.map(x => {
                if (filterTags.tags.includes(x)) {
                  return null
                }
                return <option key={x} value={x}>{x}</option>
              })}
            </Form.Select>

            <h2>Lokalita</h2>
            <Form.Check type='switch' checked={filterLocation.enabled} onChange={x => setFilterLocation({ ...filterLocation, enabled: x.currentTarget.checked })} label="Zapnout filtr"></Form.Check>
            {filterLocation.locations.map(x => {
              function remove() {
                let newLocations: string[] = [];
                filterLocation.locations.forEach(y => { if (x != y) newLocations.push(y); });
                setFilterLocation({ ...filterLocation, locations: newLocations });
              }

              return <Badge bg='secondary' key={x}>
                <X onClick={remove} style={{ cursor: 'pointer' }} /> <GeoAlt /> {x}
              </Badge>
            })}
            <p></p>
            <Form.Select value={""} onChange={x => setFilterLocation({ ...filterLocation, locations: [...filterLocation.locations, x.currentTarget.value] })}>
              <option>Vybrat lokalitu pro přidání</option>
              {props.validLocations.map(x => {
                if (filterLocation.locations.includes(x)) {
                  return null
                }
                return <option value={x} key={x}>{x}</option>
              })}
            </Form.Select>
          </Modal.Body>
        </Modal>
      </Container>
    </main>
  )
}


