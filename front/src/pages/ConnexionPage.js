import React from "react";
import ConnexionService from "../services/ConnexionService";
import { Button, Row, Col, Form, Alert, Card } from 'react-bootstrap';


class ConnexionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass: "",
            showConfirm: false,
            messageSucces: "",
            messageErreur: "",
            showError: false,
            isLoginPage: true,
            titre: 'Connexion'
        };
    }

    //pour remplacer le state
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    //appel service pour authentifier l'utilisateur
    login() {
        //verifier les champs
        if (this.state.email !== "" && this.state.pass !== "") {
            let body = {
                "email": this.state.email,
                "pass": this.state.pass
            }

            ConnexionService.connexion(body).then((valeur) => {
                this.props.history.push("/produits")
            }, (error) => {
                this.showErrorMessage(error.response.data.error)
                this.reinitForm()
            });
        } else {
            this.showErrorMessage('Veuillez remplir tous les champs')
        }
    }

    //appel service pour enregistrer un utilisateur
    register() {
        //verifier les champs
        if (this.state.email !== "" && this.state.pass !== "") {

            let body = {
                "email": this.state.email,
                "pass": this.state.pass
            }

            ConnexionService.inscription(body).then((valeur) => {
                //succes
                this.showConfirmationMessage('Votre compte a été créé avec succès');
                this.reinitForm()
            }, (error) => {
                //erreur
                this.showErrorMessage(error.response.data.error)
            });
        } else {
            this.showErrorMessage('Veuillez remplir tous les champs')
        }
    }
    //changer de page ( login ou inscription)
    changePage(value, titrePage) {
        this.setState({ isLoginPage: value, titre: titrePage });
    }

    //reinitialiser le formulaire
    reinitForm() {
        this.setState({
            email: "",
            pass: "",
            isLoginPage: true,
            titre: 'Connexion'
        })
    }

    //afficher le message d'erreur
    showErrorMessage(message) {
        this.setState({ showError: true, messageErreur: message })
    }

    //afficher le message de confirmation
    showConfirmationMessage(message) {
        this.setState({ showConfirm: true, messageSucces: message })
    }

    //pour cacher le message de confirmation
    hideConfirmation() {
        this.setState({ showConfirm: false });
    }

    //pour cacher le message d'erreur
    hideErreur(value) {
        this.setState({ showError: false });
    }

    render() {
        return (
            <div style={style.container}>
                <div style={style.formClass}>
                    <Card>
                        <Card.Body>

                            {this.state.showConfirm === true &&
                                <Alert variant="success" onClose={() => this.hideConfirmation()} dismissible>
                                    {this.state.messageSucces}
                                </Alert>
                            }
                            {this.state.showError === true &&
                                <Alert variant="danger" onClose={() => this.hideErreur()} dismissible>
                                    {this.state.messageErreur}
                                </Alert>
                            }

                            <Card.Title>

                                <h3>{this.state.titre}</h3>

                            </Card.Title>
                            <Form >
                                <Row>
                                    <Col>
                                        <Form.Group >
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control value={this.state.email} name="email" onChange={this.myChangeHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group >
                                            <Form.Label>Mot de passe</Form.Label>
                                            <Form.Control type="password" value={this.state.pass} name="pass" onChange={this.myChangeHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 10 }}>
                                    <Col>
                                        {(this.state.isLoginPage) ? (
                                            <Button style={style.buttonForm} variant="success" onClick={() => this.login()} block>Connexion</Button>
                                        ) : (
                                                <Button style={style.buttonForm} variant="success" onClick={() => this.register()} block>Valider</Button>
                                            )}
                                    </Col>
                                    <Col>

                                        {(this.state.isLoginPage) ? (
                                            <Button style={style.buttonForm} variant="outline-primary" onClick={() => this.changePage(false, 'Inscription')} block>Inscription</Button>
                                        ) : (
                                                <Button style={style.buttonForm} variant="outline-primary" onClick={() => this.reinitForm()} block>Annuler</Button>
                                            )}
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>

                    </Card>
                </div>
            </div>

        )
    }
}


const style = {
    container: {
        backgroundColor: '#eaeaea',
        height: '100vh',
        display: "flex",
        justifyContent: "center"
    },
    formClass: {
        backgroundColor: '#ffffff',
        width: '30vw',
        height: '30vh',
        marginTop: '20vh'
    },
}
export default ConnexionPage