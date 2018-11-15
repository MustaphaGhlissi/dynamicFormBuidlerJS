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
    'steps' => 20, //20 Nombre d'étapes
    'title' => 'Mon formulaire multi-étapes',
    'rumm' => 'XEGGDEMGFEZRMJGGJEZLRGJQEGJLKREGKERZGQEZG',
    'sections' => [ // Les étapes de formulaire
        [
            'sectionTitle' => '',
            'sectionDescription' => '',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] ,
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [        // Contenu de l'étape
                    'type' => 'paragraph', 'content' => 'Nous allons vous accompagner pour compléter les éléments qui nous sont indispensables pour votre bonne installation. '
                ]
            ]
        ],
        [
            'sectionTitle' => 'INFORMATIONS ADMINISTRATIVES DU CENTRE',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => true,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Forme juridique', 'type' => 'select', 'name' => 'jurid', 'required' => false,
                    'options' => [
                        ['label' => '-- Choisir --', 'value' => ''],
                        ['label' => 'Forme 1', 'value' => 'forme1'],
                        ['label' => 'Forme 2', 'value' => 'forme2']
                    ]
                ],
                [
                    'label' => 'Raison sociale', 'type' => 'text', 'name' => 'raison', 'placeholder' => '', 'required' => false, 'exported' => true,
                ],
                [
                    'label' => 'N° SIREN', 'type' => 'text', 'name' => 'siren', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Nom du cabinet', 'type' => 'text', 'name' => 'cabinet', 'placeholder' => '', 'required' => true
                ],
                [
                    'label' => 'Nom du représentant légal', 'type' => 'text', 'name' => 'owner', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Code postal', 'type' => 'text', 'name' => 'zipCode', 'placeholder' => '', 'required' => true, 'exported' => true,
                ],
                [
                    'label' => 'Adresse', 'type' => 'text', 'name' => 'address', 'placeholder' => '', 'required' => true, 'exported' => true,
                ],
                [
                    'label' => 'Ville', 'type' => 'select', 'name' => 'city', 'placeholder' => '', 'required' => true, 'exported' => true,
                    'options' => [
                        ['label' => '-- Choisir --', 'value' => ''],
                    ]
                ],
                [
                    'label' => 'Tel Fixe', 'type' => 'tel', 'name' => 'phone', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Fax', 'type' => 'tel', 'name' => 'fax', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Mail', 'type' => 'email', 'name' => 'mail', 'placeholder' => '', 'required' => true, 'grouped' => true, 'maxFields' => 4
                ],
                [
                    "label" => "La structure paie la facture", 'type' => 'checkbox', 'name' => 'structurePayment', 'required' => true,
                    'multiple' => false, 'showExtraContent' => true, 'checked'=>true,
                    "extraContent" => [
                        [
                            'label' => 'IBAN', 'type' => 'text', 'name' => 'iban', 'placeholder' => '', 'required' => true
                        ],
                        [
                            'label' => 'BIC', 'type' => 'text', 'name' => 'bic', 'placeholder' => '', 'required' => true
                        ],
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'Coordonnées de l\'interlocuteur Principal',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Nom', 'type' => 'text', 'name' => 'firstName', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Prénom', 'type' => 'text', 'name' => 'lastName', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Email', 'type' => 'email', 'name' => 'email', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Tél fixe', 'type' => 'tel', 'name' => 'workPhone', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Tél', 'type' => 'tel', 'name' => 'phone', 'placeholder' => '', 'required' => false
                ]
            ]
        ],
        [
            'sectionTitle' => 'Facturation',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Coordonées du responsable', 'type' => 'text', 'name' => 'responsible', 'placeholder' => '', 'required' => false,
                ],
                [
                    'label' => 'Raison sociale', 'type' => 'text', 'name' => 'raison', 'placeholder' => '', 'required' => false, 'imported' => true,
                ],
                [
                    'label' => 'Adresse de facturation', 'type' => 'text', 'name' => 'address', 'placeholder' => '', 'required' => false, 'imported' => true,
                ],
                [
                    'label' => 'Code postal', 'type' => 'text', 'name' => 'zipCode', 'placeholder' => '', 'required' => false, 'imported' => true,
                ],
                [
                    'label' => 'Ville', 'type' => 'select', 'name' => 'city', 'placeholder' => '', 'required' => true, 'imported' => true,
                    'options' => [
                        ['label' => '-- Choisir --', 'value' => ''],
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'Questions Techniques - Téléphonie - Internet - Logiciel Metier',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => 6, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Utilisez-vous déjà un outil en ligne de prise de rdv?', 'type' => 'radio', 'name' => 'rdvLine', 'required' => true,
                    'options' => [
                        ['label' => 'Oui', 'value' => 'oui', 'checked' => true, 'pageBreak' => false],
                        ['label' => 'Non', 'value' => 'non', 'pageBreak' => true]
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'Questions Techniques - Téléphonie - Internet - Logiciel Metier',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [

                [
                    'label' => 'Lequel ?', 'type' => 'select', 'name' => 'rdvLine', 'required' => false,
                    'options' => [
                        ['label' => 'Doctolib', 'value' => 'doctolib'],
                        ['label' => 'MonDocteur', 'value' => 'mondocteur'],
                        ['label' => 'Autre', 'value' => 'autre']
                    ]
                ],
                [
                    'label' => 'Autre réponse', 'type' => 'text', 'name' => 'otherResponseMode', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Date de résiliation prévue', 'type' => 'date', 'name' => 'resiliationDate', 'minDate' => true, 'placeholder' => '', 'required' => false
                ]

            ]
        ],
        [
            'sectionTitle' => 'Questions Techniques - Téléphonie - Internet - Logiciel Metier',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => 8, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Avez-vous un responsable informatique?', 'type' => 'radio', 'name' => 'responsible', 'required' => false,
                    'options' => [
                        ['label' => 'Oui', 'value' => 'oui', 'checked' => true, 'pageBreak' => false],
                        ['label' => 'Non', 'value' => 'non', 'pageBreak' => true]
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'Coordonnées du responsable Informatique',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] ,
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Nom', 'type' => 'text', 'name' => 'lastName', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Prénom', 'type' => 'text', 'name' => 'firstName', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Tél', 'type' => 'tel', 'name' => 'workPhone', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Mobile', 'type' => 'tel', 'name' => 'mobile', 'placeholder' => '', 'required' => false
                ],
                [
                    'label' => 'Email', 'type' => 'email', 'name' => 'email', 'placeholder' => '', 'required' => false
                ]

            ]
        ],
        [
            'sectionTitle' => 'Questions Techniques - Téléphonie - Internet - Logiciel Metier',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Utilisez-vous un logiciel dit "métier"?', 'type' => 'radio', 'name' => 'soft', 'required' => false,
                    'options' => [
                        ['label' => 'Oui', 'value' => 'oui', 'checked' => true],
                        ['label' => 'Non', 'value' => 'non']
                    ]
                ],
                [
                    'label' => 'Si "Oui" lequel ?', 'type' => 'text', 'name' => 'softName', 'placeholder' => '', 'required' => false
                ]
            ]
        ],
        [
            'sectionTitle' => 'Quel est votre fournisseur d\'internet?',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Fournisseur ', 'type' => 'select', 'name' => 'netDeliver', 'required' => false,
                    'options' => [
                        ['label' => '-- Choisir --', 'value' => ''],
                        ['label' => 'Orange', 'value' => 'orange'],
                        ['label' => 'SFR', 'value' => 'sfr']
                    ]
                ],
                [
                    'label' => 'Autre', 'type' => 'text', 'name' => 'otherDeliver', 'placeholder' => '', 'required' => false
                ]
            ]
        ],
        [
            'sectionTitle' => 'Qui est votre opérateur téléphonique ?',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Fournisseur ', 'type' => 'select', 'name' => 'netDeliver', 'required' => false,
                    'options' => [
                        ['label' => '-- Choisir --', 'value' => ''],
                        ['label' => 'Orange', 'value' => 'orange'],
                        ['label' => 'SFR', 'value' => 'sfr'],
                        ['label' => 'BOUYGUES TELECOM', 'value' => 'bouygues_telecom']
                    ]
                ],
                [
                    'label' => 'Autre', 'type' => 'text', 'name' => 'otherOperator', 'placeholder' => '', 'required' => false
                ]
            ]
        ],
        [
            'sectionTitle' => 'Questions Techniques - Téléphonie - Internet - Logiciel Metier',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => 14, // -1 Par défaut , sinon l'étape suivante, là il s'agit d'un saut de page : la page suivante sera 14 et non plus 13
            'sectionContent' => [
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
            'sectionTitle' => 'Adresse du site Internet',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => 16, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Coordonnée du webmaster',
                    'helpText' => 'Afin de mettre en place le module de prise de rdv sur votre site internet nous devons communiquer avec votre prestataire. Nous avons besoin de son mail et de son nom',
                    'type' => 'text', 'name' => 'lastName', 'placeholder' => '', 'required' => false, 'pageBreak' => true
                ]

            ]
        ],
        [
            'sectionTitle' => 'Questions Techniques - Téléphonie - Internet - Logiciel Metier',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => 14, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Avez-vous souscrit l\'offre "Mini-Site" d\'ALAXIONE ?', 'type' => 'radio', 'name' => 'miniWebsite', 'required' => false,
                    'options' => [
                        ['label' => 'Oui', 'value' => 'oui', 'checked' => true, 'pageBreak' => true ], // S'il existe un saut de page , il faut mettre l'attribut dans le champ relative au saut de page.
                        ['label' => 'Non', 'value' => 'non', 'pageBreak' => false]
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'Adresse du site Internet',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Quel nom de domaine souhaitez vous ?',
                    'secondaryLabel' => 'Domaine secondaire',
                    'helpText' => 'Toujours choisir un ou plusieurs noms de domaine simple et court, afin que vos patients puisse s\'en rappeler et pas faire d\'erreur de saisie',
                    'type' => 'text', 'name' => 'websiteAddress', 'placeholder' => '', 'required' => false, 'grouped' => true, 'maxFields' => -1
                ]

            ]
        ],
        [
            'sectionTitle' => 'Importer vos photos',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => true,
            'groupedBlocks' => 1,
            'blocksTitle' => 'Photo',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [4] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [        // Contenu de l'étape
                    [
                        'label' => 'Photo', 'type' => 'file', 'fileType'=>'image', 'width' => 1500, 'height' => 200, 'name' => 'photo', 'placeholder' => '', 'required' => true
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'Le site principal',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => true,
            'groupedBlocks' => 1,
            'blocksTitle' => 'Le site principal',
            'secondaryBlocksTitle' => 'Site principal alternative',
            'maxBlocks' => [-1] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => true,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    [
                        'label' => 'Nom du cabinet', 'type' => 'text', 'name' => 'cabinet', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Adresse', 'type' => 'text', 'name' => 'address', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Code postal', 'type' => 'text', 'name' => 'zipCode', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Ville', 'type' => 'select', 'name' => 'city', 'placeholder' => '', 'required' => false,
                        'options' => [
                            ['label' => '-- Choisir --', 'value' => ''],
                        ]
                    ],
                    [
                        'label' => 'Téléphone', 'type' => 'tel', 'name' => 'phone', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Fax', 'type' => 'tel', 'name' => 'fax', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Mail', 'type' => 'email', 'name' => 'mail', 'placeholder' => '', 'required' => false
                    ],
                    [
                        'label' => 'Horaires d\'ouverture', 'type' => 'area', 'grouped' => true, 'maxFields' => -1,
                        'content' => [
                            [
                                'label' => 'Jour', 'type' => 'select', 'name' => 'dayOpen',  'required' => false,
                                'options' => [
                                    ['label' => '-- Choisir --', 'value' => ''],
                                    ['label' => 'Lundi', 'value' => 'lundi'],
                                    ['label' => 'Mardi', 'value' => 'mardi'],
                                    ['label' => 'Mercredi', 'value' => 'mercredi'],
                                    ['label' => 'Jeudi', 'value' => 'jeudi'],
                                    ['label' => 'Vendredi', 'value' => 'vendredi'],
                                    ['label' => 'Samedi', 'value' => 'samedi'],
                                    ['label' => 'Dimanche', 'value' => 'dimanche'],
                                ]
                            ],
                            [
                                'label' => 'Heure d\'ouverture', 'type' => 'time', 'name' => 'timeOpenAM', 'placeholder' => '--:--', 'required' => false,
                            ],
                            [
                                'label' => 'Heure de fermeture', 'type' => 'time', 'name' => 'timeCloseAM', 'placeholder' => '--:--', 'required' => false,
                            ],
                            [
                                "label" => "Ouvert après midi ?", 'type' => 'checkbox', 'name' => 'closedTime', 'required' => true, 'multiple' => false, 'showExtraContent' => false,
                                "extraContent" => [
                                    [
                                        'label' => 'Heure d\'ouverture', 'type' => 'time', 'name' => 'timeOpenPM', 'placeholder' => '--:--', 'required' => false,
                                    ],
                                    [
                                        'label' => 'Heure de fermeture', 'type' => 'time', 'name' => 'timeClosePM', 'placeholder' => '--:--', 'required' => false,
                                    ]
                                ]
                            ]

                        ]
                    ],
                    [
                        'label' => 'Photo du site', 'type' => 'file', 'fileType'=>'image', 'width' => 800, 'height' => 300, 'name' => 'photo', 'placeholder' => '', 'required' => false
                    ],
                    [
                        "label" => "Mode de règlement", 'type' => 'checkbox', 'name' => 'rules', 'required' => false, 'multiple' => true,
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
                        "label" => "Accessibilité", 'type' => 'checkbox', 'name' => 'accessibility', 'required' => true, 'multiple' => true,
                        "options" => [
                            [
                                'label' => 'Ascenseur', 'value' => 'ascenseur', 'checked' => false
                            ],
                            [
                                'label' => 'Accessibilité handicapé', 'value' => 'handicapé', 'checked' => false
                            ]
                        ]
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'Les Praticiens',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => true,
            'groupedBlocks' => 1,
            'blocksTitle' => 'Praticien',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [-1] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => true,
            'print' => true,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [        // Contenu de l'étape
                    [
                        'label' => 'Spécialité', 'type' => 'select', 'name' => 'speciality', 'required' => true,
                        'options' => [
                            ['label' => '-- Choisir --', 'value' => ''],
                            ['label' => 'Spécialité 1', 'value' => 'Spécialité 1'],
                            ['label' => 'Spécialité 2', 'value' => 'Spécialité 2'],
                            ['label' => 'Spécialité 3', 'value' => 'Spécialité 3'],
                            ['label' => 'Spécialité 4', 'value' => 'Spécialité 4']
                        ]
                    ],
                    [
                        'label' => 'Civilité', 'type' => 'select', 'name' => 'civility', 'required' => true, 'pushToExtra' => true,
                        'options' => [
                            ['label' => '-- Choisir --', 'value' => ''],
                            ['label' => 'Professeur', 'value' => 'professeur'],
                            ['label' => 'Docteur', 'value' => 'docteur', 'selected' => true],
                            ['label' => 'Monsieur', 'value' => 'monsieu'],
                            ['label' => 'Madame', 'value' => 'madame']
                        ]
                    ],
                    [
                        'label' => 'Joindre une photo', 'type' => 'file', 'fileType'=>'image', 'width' => 150, 'height' => 150,'name' => 'photo', 'required' => false
                    ],
                    [
                        'label' => 'Nom', 'type' => 'text', 'name' => 'lastName', 'placeholder' => '', 'required' => false, 'pushToExtra' => true,
                    ],
                    [
                        'label' => 'Prénom', 'type' => 'text', 'name' => 'firstName', 'placeholder' => '', 'required' => false, 'pushToExtra' => true,
                    ],
                    [
                        'label' => 'N° RPPS', 'type' => 'text', 'name' => 'rpps', 'placeholder' => '', 'required' => false,
                    ],
                    [
                        'label' => 'Téléphone mobile', 'type' => 'tel',
                        'helpText' => '(usage strictement réservé à l’échange d\'informations dans le cadre de la souscription)',
                        'name' => 'mobile', 'placeholder' => '', 'required' => false, 'printable' => true,
                    ],
                    [
                        'label' => 'Mail', 'type' => 'email', 'name' => 'email', 'placeholder' => '', 'required' => false,
                    ],
                    [
                        'label' => 'Mot de passe souhaité', 'type' => 'password', 'name' => 'password', 'placeholder' => '', 'required' => false,
                        'helpText' => 'Minimum 6 caractères / 1 majuscule / 1 chiffre / 1 caractère spécial'
                    ],
                    [
                        "label" => "Marquer le médécin comme payeur", 'type' => 'checkbox', 'name' => 'doctorPayment', 'required' => true,
                        'multiple' => false, 'showExtraContent' => false,
                        "extraContent" => [
                            [
                                'label' => 'Raison sociale', 'type' => 'text', 'name' => 'raison', 'placeholder' => '', 'required' => false, 'pullToExtra' => true,
                            ],
                            [
                                'label' => 'Adresse', 'type' => 'text', 'name' => 'address', 'placeholder' => '', 'required' => false, 'imported' => true
                            ],
                            [
                                'label' => 'Code postal', 'type' => 'text', 'name' => 'zipCode', 'placeholder' => '', 'required' => false, 'imported' => true
                            ],
                            [
                                'label' => 'Ville', 'type' => 'select', 'name' => 'city', 'placeholder' => '', 'required' => false, 'imported' => true,
                                'options' => [
                                    ['label' => '-- Choisir --', 'value' => ''],
                                ]
                            ],
                            [
                                'label' => 'IBAN', 'type' => 'text', 'name' => 'iban', 'placeholder' => '', 'required' => false,'imported' => true
                            ],
                            [
                                'label' => 'BIC', 'type' => 'text', 'name' => 'bic', 'placeholder' => '', 'required' => false,'imported' => true
                            ]
                        ]
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'L\'équipe administrative',
            'sectionDescription' => 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.',
            'grouped' => true,
            'groupedBlocks' => 1,
            'blocksTitle' => 'Administratif',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [-1] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => true,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [        // Contenu de l'étape
                    [
                        'label' => 'Fonction', 'type' => 'select', 'name' => 'function', 'required' => true,
                        'options' => [
                            ['label' => '-- Choisir --', 'value' => ''],
                            ['label' => 'Fonction 1', 'value' => 'Fonction 1'],
                            ['label' => 'Fonction 2', 'value' => 'Fonction 2'],
                            ['label' => 'Fonction 3', 'value' => 'Fonction 3'],
                            ['label' => 'Fonction 4', 'value' => 'Fonction 4']
                        ]
                    ],
                    [
                        'label' => 'Civilité', 'type' => 'select', 'name' => 'civility', 'required' => true,
                        'options' => [
                            ['label' => '-- Choisir --', 'value' => ''],
                            ['label' => 'Mme', 'value' => 'Mme'],
                            ['label' => 'M.', 'value' => 'M']
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
                        'label' => 'Mot de passe souhaité', 'type' => 'password', 'name' => 'password', 'placeholder' => '', 'required' => false,
                        'helpText' => 'Minimum 6 caractères / 1 majuscule / 1 chiffre / 1 caractère spécial'
                    ]
                ]
            ]
        ],
        [
            'sectionTitle' => 'INFORMATIONS ADMINISTRATIVES DU CENTRE',
            'sectionDescription' => 'Avant de pouvoir soumettre votre demande, il est impératif d\'uploader le mandat signée',
            'grouped' => false,
            'groupedBlocks' => 0,
            'blocksTitle' => '',
            'secondaryBlocksTitle' => '',
            'maxBlocks' => [] , //Si le nombre de groupes par block est illimité mettre -1
            'resume' => false,
            'print' => false,
            'nextStep' => -1, // -1 auto , sinon l'étape suivante
            'sectionContent' => [
                [
                    'label' => 'Joindre le mandat signé', 'type' => 'file', 'fileType'=>'document', 'name' => 'mandat', 'required' => false, "grouped" => true
                ]
            ]
        ],
    ]
);

exit (json_encode($form));