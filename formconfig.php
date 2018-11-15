<?php
/**
 * Created by PhpStorm.
 * User: olinky
 * Date: 22/10/18
 * Time: 08:50 ص
 */


/*
 *
 * url : l'url de formulaire
 * steps: Nombre d'étapes
 * title: Titre global de formulaire
 * sections: tableau des différentes étapes
 *
 * Pour chaque étape ona :
 * sectionTitle: "titre de l'étape en cours
 * grouped: l'étape contient des blocks groupés ou non
 * groupedBLocks: nombre des blocks groupés par étape
 * blocksTitle: Le titre de block : exemple Fiche praticien
 * maxBlocks: Tableau de taille groupedBlocks designant le nombre de copies de chaque block (Exemple 2 copie deux groupes FIches praticiens, 3 fiches medecins etc ..)
 * nextStep: Désigne l'étape suivante à atteindre s'il s'agit d'un saut de page
 *
 *
 *
 *
 * Liste des attributs possibles
 * Champs de saisie : label, type , name, placeholder, required (True | False), grouped (True | False : plusieurs copies), multiple (True | False)
 * Type : text, textarea, select, email, tel , password, paragraph, radio, checkbox, file (avec un attribut fileType qui doit etre soit image soit un pdf)
 *
 * Checkbox, Radio & Select ont un attribut supplémentaires "options" pour les différents choix dedans
*  Les options ont des sous attributs : label , value, checked (True | False : Si radio ou checkbox), selected (pour select) , pageBreak (True | False : Si le choix déclenche un saut de page)
 *
 * Pour les uploads d'image il faut fournir deux attributs width & height de l'image
 *
 *
 * */

$form = array(
    'url' => 'https://www.google.com', // L'url vers lequel on envoye le formulaire
    'steps' => 2, // Nombre d'étapes
    'title' => 'Questionnaire d\'installation ALAXIONE',
    'sections' => [ // Les étapes de formulaire
        [
            'sectionTitle' => 'Titre de la section',
            'grouped' => false, // False si y a pas des champs groupés sinon True
            'groupedBlocks' => 0, // 0 si grouped false sinon le nombre des différents blocks par section (Fiche client, fiche admin etc ... dans la meme section)
            'blocksTitle' => '', // Titre du block
            'maxBlocks' => [] , // Tableau de  taille groupedBlocks Nombre maximum qu'on peut avoir pour chaque block (Créer 3 fiches praticiens, 2 fiches admins, 5 fiches patients etc ... dans ce cas le groupedBlocks est 3 et le maxBlocks devient [3,2,5])
            'nextStep' => -1, // -1 par défault , sinon l'étape suivante doit etre présicer (Là on parle de saut de page)
            'sectionContent' => [
                [        // Contenu de l'étape
                    'type' => 'paragraph', 'content' => 'Nous allons vous accompagner pour compléter les éléments qui nous sont indispensables pour votre bonne installation. '
                ],
                [
                    'label' => 'Current password', 'type' => 'password', 'name' => 'currentPassword', 'placeholder' => '', 'required' => true
                ],
                [
                    'label' => 'Forme juridique', 'type' => 'text', 'name' => 'jurid', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Tel Fixe', 'type' => 'tel', 'name' => 'phone', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Mail', 'type' => 'email', 'name' => 'mail', 'placeholder' => '', 'required' => false, 'grouped' => true
                ],
                [
                    'label' => 'Forme juridique', 'type' => 'file', 'fileType'=>'image', 'name' => 'jurid', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Lequel ?', 'type' => 'select', 'name' => 'rdvLine', 'required' => false,
                    'options' => [
                        ['label' => 'Doctolib', 'value' => 'doctolib'],
                        ['label' => 'MonDocteur', 'value' => 'mondocteur'],
                        ['label' => 'Autre', 'value' => 'autre']
                    ]
                ],
                [
                    "label" => "Mode de règlement", 'type' => 'checkbox', 'name' => 'rules', 'required' => false,
                    "options" => [
                        [
                            'label' => 'Cheque', 'value' => 'cheque', 'checked' => false
                        ],
                        [
                            'label' => 'Espèce', 'value' => 'espèce', 'checked' => false
                        ],
                        [
                            'label' => 'Carte bleue', 'value' => 'carte bleue', 'checked' => false
                        ],
                        [
                            'label' => 'Carte Vitale', 'value' => 'carte vitale', 'checked' => false
                        ]
                    ]
                ],
                [
                    'label' => 'Date de résiliation prévue', 'type' => 'date', 'name' => 'resiliationDate', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Avez-vous un site internet ?', 'type' => 'radio', 'name' => 'website', 'required' => false,
                    'options' => [
                        ['label' => 'Oui', 'value' => 'oui', 'checked' => true, 'pageBreak' => false],
                        ['label' => 'Non', 'value' => 'non', 'pageBreak' => true] // Si le choix est Non là il y aura le saut de page sinon on procède de manière normale
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'L\'équipe administrative',
            'sectionDescription' => '',
            'grouped' => true,
            'groupedBlocks' => 1,
            'blocksTitle' => 'Administratif',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] ,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [        // Contenu de l'étape
                    [
                        'label' => 'Fonction', 'type' => 'text', 'name' => 'function', 'placeholder' => '', 'required' => true
                    ],
                    [
                        'label' => 'Civilité', 'type' => 'select', 'name' => 'civility', 'required' => true,
                        'options' => [
                            ['label' => 'Mme', 'value' => 'professeur'],
                            ['label' => 'M.', 'value' => 'docteur']
                        ]
                    ],
                    [
                        'label' => 'Nom', 'type' => 'text', 'name' => 'lastName', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Prénom', 'type' => 'text', 'name' => 'firstName', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Mail', 'type' => 'email', 'name' => 'email', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Mot de passe souhaité', 'type' => 'password', 'name' => 'password', 'placeholder' => '', 'required' => false
                    ]
                ]
            ]
        ]
    ]

);

exit (json_encode($form));