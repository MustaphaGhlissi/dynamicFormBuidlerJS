<?php
/**
 * Created by PhpStorm.
 * User: olinky
 * Date: 22/10/18
 * Time: 08:50 ص
 */


$form = array(
    'url' => 'https://www.google.com', // L'url vers lequel on envoye le formulaire
    'steps' => 4, // Nombre d'étapes
    'sections' => [ // Les étapes de formulaire
        [
            'sectionTitle' => 'Check boxes & Textarea',
            'sectionContent' => [        // Contenu de l'atape
                [
                    "label" => "Type de compte", 'type' => 'radio', 'name' => 'accountType', 'required' => true,
                    "options" => [
                        [
                            'label' => 'Personnel', 'value' => 'personnel', 'checked' => true
                        ],
                        [
                            'label' => 'Compte entreprise', 'value' => 'professionnel', 'checked' => false
                        ]
                    ]
                ],
                [
                    'label' => 'Description', 'type'=>'textarea', 'required' => false, 'name' => 'description', 'rows'=>12, 'placeholder' => 'Décrivez votre activité dans quelques lignes ici'
                ]
            ]
        ],
        [
            'sectionTitle' => 'Input fields , upload files, and multiple inputs',   // Titre de l'étape
            'sectionContent' => [       // Contenu de l'atape
                [
                    'label' => 'Photo de profil', 'type' => 'file', 'name' => 'photo', 'multiple' => true, 'required' => false
                ],
                [
                    'label' => 'Nom', 'type' => 'text', 'name' => 'firstName', 'placeholder' => '', 'required' => true
                ],
                [
                    'label' => 'Prénom', 'type' => 'text', 'name' => 'lastName', 'placeholder' => '', 'required' => true
                ],
                [
                    'label' => 'Email', 'type' => 'email', 'name' => 'email', 'placeholder' => '', 'multiple' => true, 'required' => true
                ],
                [
                    'label' => 'Nom d\'utilisateur', 'type' => 'text', 'name' => 'username', 'placeholder' => '', 'required' => true
                ],
                [
                    'label' => 'Genre', 'type' => 'select', 'name' => 'sexe', 'required' => true,
                    'options' => [
                        ['label' => 'Homme', 'value' => 'homme'],
                        ['label' => 'Femme', 'value' => 'femme']
                    ]
                ],
                [
                    'label' => 'Pays', 'type' => 'country', 'name' => 'country', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Ville', 'type' => 'text', 'name' => 'city', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Tél', 'type' => 'tel', 'name' => 'phone', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Date de naissance', 'type' => 'date', 'name' => 'birthDate', 'placeholder' => 'JJ/MM/AAAA', 'required' => true
                ],
                [
                    'label' => 'Heure de naissance', 'type' => 'time', 'name' => 'birthTime', 'placeholder' => 'HH:mm', 'required' => true
                ],
                [
                    'label' => 'Age', 'type' => 'number', 'name' => 'age', 'placeholder' => '00', 'required' => true
                ]

            ]
        ],
        [
            'sectionTitle' => 'Password example',   // Titre de l'étape
            'sectionContent' => [        // Contenu de l'atape
                [
                    'label' => 'Current password', 'type' => 'password', 'name' => 'currentPassword', 'placeholder' => '', 'required' => true
                ],
                [
                    'label' => 'New password', 'type' => 'password', 'name' => 'newPassword', 'placeholder' => '', 'required' => true
                ],
                [
                    'label' => 'Confirm password', 'type' => 'password', 'name' => 'confirmNewPassword', 'placeholder' => '', 'required' => true
                ]
            ]
        ]
        ,
        [
            'sectionTitle' => 'Checkbox example',    // Titre de l'étape
            'sectionContent' => [           // Contenu de l'atape
                [
                    'label' => 'J\ai lu et j\'approuve les conditions générales d\'utilisations', 'type' => 'checkbox', 'name' => 'terms', 'required' => true
                ]
            ]
        ]
    ]
);

exit (json_encode($form));