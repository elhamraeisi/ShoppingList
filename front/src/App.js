import React from "react";
import produitService from "./services/produitService";
import { Button, Row, Col, Form, Table, Alert, ButtonGroup, Card } from 'react-bootstrap';

const style = {
    app: {
        backgroundColor: '#fafafa',
        paddingTop: 50,
        paddingLeft: 100,
        paddingRight: 100
    },
    formClass: {
        marginBottom: 20,
        paddingRight: 200
    },
    buttonForm: {
        margin: 5
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            nomProduit: "",
            descProduit: "",
            prixProduit: 0,
            quantiteProduit: 1,
            idProduitPourModifier: null,
            showConfirm: false,
            showButtonModifier: false,
            messageSucces: "",
            messageErreur: "",
            showError: false
        };
    }

    componentDidMount() {
        
        this.alimenterListeProduits();
    }

    //appel service pour modifier un produit
    modifierProduit() {
        let body = {
            "nom": this.state.nomProduit,
            "description": this.state.descProduit,
            "prix": this.state.prixProduit,
            "quantite": this.state.quantiteProduit
        }
        produitService.modifierProduit(body, this.state.idProduitPourModifier).then((valeur) => {
            //mettre à jour la liste
            this.alimenterListeProduits();
            //affichage message confirmation
            this.setState({ showConfirm: true, messageSucces: 'Modifié avec succès' });

            //vider tous les champs
            this.reinitChamps()
        });
    }

    //appel service pour stocker un produit
    enregistrerProduit() {
        if (this.state.nomProduit != "" && this.state.descProduit != "" && this.state.prixProduit > 0) {
            let body = {
                "nom": this.state.nomProduit,
                "description": this.state.descProduit,
                "prix": this.state.prixProduit,
                "quantite": this.state.quantiteProduit
            }
            produitService.enregistrerProduit(body).then(() => {
                //mettre à jour la liste
                this.alimenterListeProduits();
                //affichage message confirmation
                this.setState({ showConfirm: true, messageSucces: 'Ajouté avec succès' });
                //vider tous les champs
                this.reinitChamps();
            });
        } else {
            this.setState({ showError: true, messageErreur: 'Veuillez remplir tous les champs' })
        }

    }

    //appel service pour recuperer tous les produits
    alimenterListeProduits() {
        produitService.recupererTousProduits().then((valeur) => {
            this.setState({ products: valeur });
        });
    }

    //appel service pour supprimer un produit
    supprimerUnProduit(id) {
        produitService.supprimerProduitParId(id).then(() => {
            this.alimenterListeProduits();
        });
    }

    //pour remplacer le state
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    setShowConfirmation(value) {
        this.setState({ showConfirm: value });
    }
    
    setShowErreur(value) {
        this.setState({ showError: value });
    }

    //initialiser le formulaire à partir d'un produit selectionné
        preparerFormulaireModif(produit) {

        this.setState({
            nomProduit: produit.nom,
            descProduit: produit.description,
            prixProduit: produit.prix,
            quantiteProduit: produit.quantite,
            idProduitPourModifier: produit._id,
            showButtonModifier: true,
        })

    }

    //réinitialiser le formulaire
    reinitChamps() {
        this.setState({
            nomProduit: "",
            descProduit: "",
            prixProduit: 0,
            quantiteProduit: 1,
            showButtonModifier: false,
            messageErreur: null,
            showError: false,
            messageErreur: null
        })
    }


    //retourne le visuel d'un element de la liste des produits
    renderProduct(product) {
        return (
            <tr>
                <td>{product.nom}</td>
                <td>{product.description}</td>
                <td>{product.quantite}</td>
                <td>{product.prix}</td>

                <td style={{ textAlign: 'center' }}>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="warning" onClick={() => this.preparerFormulaireModif(product)}>Modifier</Button>
                        <Button variant="danger" onClick={() => this.supprimerUnProduit(product._id)}>Supprimer</Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    };

    render() {
        return (
            <div style={style.app}>

                {this.state.showConfirm == true &&
                    <Alert variant="success" onClose={() => this.setShowConfirmation(false)} dismissible>
                        {this.state.messageSucces}
                    </Alert>
                }
                {this.state.showError == true &&
                    <Alert variant="danger" onClose={() => this.setShowErreur(false)} dismissible>
                        {this.state.messageErreur}
                    </Alert>
                }
                <Card style={style.formClass}>
                    <Card.Body>
                        <Card.Title><h3>Ajouter un produit</h3></Card.Title>
                        <Form >
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control value={this.state.nomProduit} name="nomProduit" onChange={this.myChangeHandler} />
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control value={this.state.descProduit} name="descProduit" onChange={this.myChangeHandler} />
                                    </Form.Group>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Prix</Form.Label>
                                        <Form.Control type="number" value={this.state.prixProduit} name="prixProduit" onChange={this.myChangeHandler} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                        <Form.Label>Quantité</Form.Label>
                                        
                                        <Form.Control as="select" value={this.state.quantiteProduit} name="quantiteProduit" onChange={this.myChangeHandler}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>

                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <Col>
                                    {(this.state.showButtonModifier == true) ? (
                                        <Button style={style.buttonForm} variant="warning" onClick={() => this.modifierProduit()}>Modifier</Button>

                                    ) : (
                                            <Button style={style.buttonForm} variant="success" onClick={() => this.enregistrerProduit()}>Ajouter</Button>
                                        )}

                                    <Button style={style.buttonForm} variant="outline-primary" onClick={() => this.reinitChamps()} >Annuler</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>

                </Card>
                <Card>

                    <Card.Body>
                        <h3>La liste des produits</h3>

                        {(this.state.products && this.state.products.length > 0) ? (

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Description</th>
                                        <th>Quantite</th>
                                        <th>Prix</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.products.map(product => this.renderProduct(product))}

                                </tbody>
                            </Table>
                        ) : (
                                <Alert variant='danger'>
                                    Vous avez aucun produit
                    </Alert>
                            )}
                    </Card.Body>
                </Card>
            </div>

        )
    }
}

export default App