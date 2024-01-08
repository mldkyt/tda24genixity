import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import { GetServerSidePropsContext } from 'next'
import { Badge, Button, CloseButton, Container, Form, FormControl, Modal } from 'react-bootstrap'
import { getLecturers } from '../components/lecturers'
import { GeoAlt, CashStack, X } from 'react-bootstrap-icons';



const inter = Inter({ subsets: ['latin'] })


export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const lecturers = getLecturers();

  let validTags: string[] = [];
  lecturers.forEach(x => {
    if (x.tags) {
      x.tags.forEach(x => {
        if (!validTags.includes(x.name)) {
          validTags.push(x.name);
        }
      })
    }
  })

  return {
    props: {
      lecturers,
      validTags
    }
  }
}


export default function Home(props: { lecturers: Lecturer[], validTags: string[] }) {

  const [filterMenu, setFilterMenu] = useState(false);

  const [filterPrice, setFilterPrice] = useState({ enabled: false, min: 0, max: 0 });
  const [filterTags, setFilterTags] = useState({ enabled: false, tags: [] } as { enabled: boolean, tags: string[] });

  return (
    <main className={inter.className}>
      <NavBar />
      <Container>
        <div style={{
          float: 'left',
          width: '150px'
        }}>
        </div>
        <Button onClick={() => setFilterMenu(true)} style={{
          marginBottom: '4px'
        }}>Filtry...</Button>
        <div>
          {
            props.lecturers.map(x => {
              if (filterPrice.enabled && x.price_per_hour != undefined) {
                if (filterPrice.min != 0 && x.price_per_hour < filterPrice.min) {
                  return null;
                }
                if (filterPrice.max != 0 && x.price_per_hour > filterPrice.max) {
                  return null;
                }
              }

              if (filterTags.enabled && x.tags != undefined) {
                let passed = true;
                x.tags.forEach(y => {
                  if (!filterTags.tags.includes(y.name)) {
                    passed = false;
                  }
                });
                if (!passed) return null
              }

              const fullName = `${x.title_before ?? ""} ${x.first_name} ${x.middle_name ?? ""} ${x.last_name} ${x.title_after ?? ""}`;
              return <a href={`/lecturer/${x.uuid}`} style={{
                textDecoration: 'none',
                color: 'inherit'
              }}>
                <div key={x.uuid} style={{
                  border: '1px solid grey',
                  borderRadius: '5px',
                  padding: '4px',
                  marginBottom: '1em',
                  boxShadow: '5px 5px 5px #1a1a1a'
                }}>
                  {x.picture_url && <img src={x.picture_url} alt={`Profile picture for ${fullName}`} width={64} style={{
                    padding: '0.3em',
                    borderRadius: '100%'
                  }}></img>}
                  <span style={{
                    fontWeight: 'bold',
                    marginLeft: '1em'
                  }}>{fullName}</span>
                  <p>
                    {x.claim}
                  </p>
                  <p>
                    {x.location && <><GeoAlt /> {x.location}</>} {x.price_per_hour && <><CashStack /> {x.price_per_hour} kč/h</>}
                  </p>
                  <p style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                  }}>
                    {x.tags && x.tags.map(x => {
                      return <Badge key={x.uuid} bg='secondary' style={{
                        margin: '0.1em'
                      }}>
                        {x.name}
                      </Badge>
                    })}
                  </p>
                </div>
              </a>
            })
          }
        </div>

        <Modal show={filterMenu} onHide={() => setFilterMenu(false)}>
          <Modal.Header>
            Nastavení filtrů
            <CloseButton onClick={() => setFilterMenu(false)} />
          </Modal.Header>
          <Modal.Body>
            <h2>Cena</h2>
            <Form.Check type='switch' checked={filterPrice.enabled} onChange={x => setFilterPrice({ ...filterPrice, enabled: x.currentTarget.checked })} label="Zapnout filtr"></Form.Check>

            <span>Minimum</span>
            <FormControl type='number' min={0} value={filterPrice.min} onChange={x => setFilterPrice({ ...filterPrice, min: Number(x.currentTarget.value) })}></FormControl>

            <span>Maximum</span>
            <FormControl type='number' min={0} value={filterPrice.max} onChange={x => setFilterPrice({ ...filterPrice, max: Number(x.currentTarget.value) })}></FormControl>

            <h2>Štítky</h2>
            {filterTags.tags.map(x => {
              function remove() {
                let newTags: string[] = [];
                filterTags.tags.forEach(y => { if (x != y) newTags.push(y); });
                setFilterTags({ ...filterTags, tags: newTags });
              }

              return <Badge bg='secondary'>
                <X onClick={remove} style={{ cursor: 'pointer' }} /> {x}
              </Badge>
            })}
            <p></p>
            <Form.Select value={""} onChange={x => setFilterTags({ ...filterTags, tags: [...filterTags.tags, x.currentTarget.value] })}>
              <option></option>
              {props.validTags.map(x => {
                if (filterTags.tags.includes(x)) {
                  return null
                }
                return <option value={x}>{x}</option>
              })}
            </Form.Select>
          </Modal.Body>
        </Modal>
      </Container>
    </main>
  )
}


