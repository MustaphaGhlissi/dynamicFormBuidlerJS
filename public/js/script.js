$(document).ready(function () {

    $.ajax({
        url: "formconfig2.php",
        success: function (result) {
            let formData = JSON.parse(result),
                steps = formData.steps,
                sections = formData.sections,
                formURL = formData.url,
                rumm = formData.rumm;

            $('form').attr('action', formURL);
            $('form').attr('data-rumm', rumm);
            $('.form-title').text(formData.title);
            $('.btn-intialize-next').attr('data-steps', steps);


            sections.forEach(function (section, index) {
                let  stepsIndicator = '<span data-order-step="'+ index +'"></span>',
                    stepTitle = null,
                    stepDescription = null,
                    resume = section.resume,
                    print = section.print,
                    stepContent = '<div id="step' + index + '" class="container tab-pane" data-resume="' + resume + '" data-print="' + print + '">',
                    headerSection,

                    row = '<div class="row">';

                if($.trim(section.sectionTitle) !== ''){
                    stepTitle = '<h4 class="step-title text-center">' + (section.sectionTitle) + '</h4>';
                }

                if($.trim(section.sectionDescription) !== ''){
                    stepDescription = '<p class="step-description">'+section.sectionDescription+'</p>';
                }

                headerSection = (stepTitle && stepDescription) ? '<div class="row"><div class="col-12">' + stepTitle + stepDescription + '<hr class="seperator"/></div> </div>' : '';
                stepContent += headerSection;


                if (index === 0) {
                    stepsIndicator = '<span data-order-step="'+ index +'" class="active"></span>';
                    stepContent = '<div id="step' + index + '" class="container tab-pane active show" data-resume="' + resume + '" data-print="' + print + '">' + headerSection;

                    if(resume) {
                        $('.btn-next').attr('data-resume', true);
                    }
                }

                $('.steps-indicator').append(stepsIndicator);

                if ('grouped' in section && section.grouped ) {

                    section.sectionContent.forEach(function (block, indexBlock) {
                        let divBlock = '<div class="grouped-block"><div class="text-center block-buttons" data-index="'+index+'"><div class="btn-group btn-group-sm text-center">' +
                            '<button type="button" class="btn btn-outline-success btn-prev-block" data-id="'+ index + indexBlock + '1" data-order = "1" data-index="'+index+'" data-block="'+indexBlock+'">' +
                            '<i class="fa fa-chevron-circle-left"></i></button>' +
                            '<button type="button" class="btn btn-outline-success btn-next-block" data-id="'+ index + indexBlock + '1" data-order = "1" data-index="'+index+'" data-block="'+indexBlock+'">' +
                            '<i class="fa fa-chevron-circle-right"></i></button></div></div>' +
                            '<div class="tab-content block-tabs">',
                            divGroupButtons = '<div class="text-right" data-id="btn-grouped-section' + index + section.groupedBlocks + '"><div class="btn-group">' +
                                '<button type="button" class="btn btn-outline-success btn-addField" data-max-fields="'+section.maxBlocks[indexBlock] +'" ' +
                                'data-child="false" data-id="' + index + indexBlock + '1" data-order="1"><i class="fa fa-plus-circle"></i></button>' +
                                '</div></div>', divGroup;

                        if($.trim(section.secondaryBlocksTitle) !== ''){
                            divGroup = '<div class="container tab-pane active show" data-order-block="1" data-secondary-title="'+section.secondaryBlocksTitle+'" data-multiple="' + index + indexBlock + '1" data-order="1" ' +
                                'data-index="'+index+'" data-block="'+indexBlock+'" ><h5 class="text-center block-title">' + section.blocksTitle + '</h5>';
                        }
                        else{
                            divGroup = '<div class="container tab-pane active show" data-order-block="1" data-multiple="' + index + indexBlock + '1" data-order="1" ' +
                                'data-index="'+index+'" data-block="'+indexBlock+'" ><h5 class="text-center block-title">' + section.blocksTitle +
                                ' <badge class="badge badge-pill badge-secondary" data-block="'+indexBlock+'">1</badge>' +'</h5>';
                        }

                        row = '<div class="row">';

                        block.forEach(function (contentBlock, indexField) {
                            let divField = '<div class="form-group col-lg-6">';
                            let inputGroup = '<div class="input-group mb-3">';
                            let labelField = "<label data-select='true' for='" + contentBlock.name + index + indexBlock + indexField + "1'>" + contentBlock.label + "</label>", label;
                            let inputField = "<input data-select='true' class='form-control input-error' ",
                                textField = "<textarea data-select='true' class='form-control' ",
                                selectField = "<select data-select='true' class='form-control' ",
                                paragraph = '<p>';

                            divField += labelField;

                            switch (contentBlock.type) {
                                case 'area':
                                    labelField = "<label for='" + contentBlock.name + index + indexBlock + indexField + "1'>" + contentBlock.label + "</label>";
                                    let areaRow = '<div class="area-multiple"><div data-multiple="' + index + indexBlock + indexField + '1" data-order-block="1" data-order="1" '+
                                        '  data-index="'+index+'" data-block="'+indexBlock+'" data-field="'+indexField+'"><div class="container"><div class="row">',
                                        areaButtons = '<div class="text-right" data-id="btn-grouped-section"><div class="btn-group">' +
                                            '<button type="button" class="btn btn-outline-success btn-addAreaField" ' +
                                            'data-child="false" data-id="' + index + indexBlock + indexField + '1" data-order-block="1" data-order="1"><i class="fa fa-plus-circle"></i></button>' +
                                            '</div></div>';

                                    contentBlock.content.forEach(function (contentField, contentFieldIndex) {
                                        let areaDivField = '<div class="form-group col-lg-6">', areaLabel;
                                        divField = '<div class="form-group col-lg-12">';
                                        inputField = "<input class='form-control input-error' ";
                                        areaLabel = "<label for='" + contentField.name + index + indexBlock + indexField + contentFieldIndex + "1'>" + contentField.label + "</label>";
                                        selectField = "<select class='form-control' ";
                                        inputGroup = '<div class="input-group mb-3">';
                                        switch (contentField.type) {
                                            case 'select':
                                                areaDivField = '<div class="form-group col-lg-12">'
                                                if (contentField.required) {
                                                    selectField += "required ";
                                                }

                                                if (contentField.multiple) {
                                                    selectField += 'multiple ';
                                                }

                                                if ('exported' in contentField){
                                                    selectField += " data-exported='"+contentField.exported+"' ";
                                                }

                                                if ('imported' in contentField){
                                                    selectField += " data-imported='"+contentField.imported+"' ";
                                                }

                                                if ('pushToExtra' in contentField){
                                                    selectField += " data-push-extra='"+contentField.pushToExtra+"' ";
                                                }

                                                if ('pullToExtra' in contentField){
                                                    selectField += " data-pull-extra='"+contentField.pullToExtra+"' ";
                                                }

                                                selectField += "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                                    "data-id='" + index + indexBlock + indexField + contentFieldIndex + "' " +
                                                    "id='" + contentField.name + index + indexBlock + indexField + contentFieldIndex + "1' name='" + contentField.name + index + indexBlock + indexField + contentFieldIndex + "[]'>";
                                                contentField.options.forEach(function (option) {
                                                    selectField += "<option value='" + option.value + "'>" + option.label + "</option>";
                                                });
                                                selectField += "</select>";

                                                areaDivField += areaLabel;
                                                areaDivField += selectField;

                                                break;


                                            case 'time':

                                                if ('exported' in contentField){
                                                    inputField += " data-exported='"+contentField.exported+"' ";
                                                }

                                                if ('imported' in contentField){
                                                    inputField += " data-imported='"+contentField.imported+"' ";
                                                }

                                                if ('pushToExtra' in contentField){
                                                    inputField += " data-push-extra='"+contentField.pushToExtra+"' ";
                                                }

                                                if ('pullToExtra' in contentField){
                                                    inputField += " data-pull-extra='"+contentField.pullToExtra+"' ";
                                                }

                                                inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                    " data-id='" + index + indexBlock + indexField + contentFieldIndex + "' id='" + contentField.name + index + indexBlock + indexField + contentFieldIndex + "1' " +
                                                    " data-target='time'  name='" + contentField.name + index + indexBlock + indexField + contentFieldIndex + "[]'  placeholder='" + contentField.placeholder + "' />";

                                                inputGroup += inputField + '  <div class="input-group-append">' +
                                                    ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                                    ' </div></div>';

                                                areaDivField += areaLabel;
                                                areaDivField += inputGroup;

                                            break;

                                            case 'checkbox':
                                                //labelField = "<label for='" + contentBlock.name + index + indexBlock + indexField + "1'>" + contentBlock.label + "</label>"

                                                areaDivField = '<div class="form-group col-lg-12">'
                                                if(contentField.multiple)
                                                {
                                                    /*let checkboxes = '<div class="checkboxes" data-index="'+ index +'" data-order="1">', checkBoxItem;
                                                    contentBlock.options.forEach(function (option, optionIndex) {
                                                        checkBoxItem = '<div class="check-box-area">';
                                                        label = '<label for="' + contentBlock.name + index + indexBlock + indexField + optionIndex + '1">' + option.label + '</label>';
                                                        inputField = "<input type='" + contentBlock.type + "' " +
                                                            "id='" + contentBlock.name + index + indexBlock + indexField + optionIndex + "1' " +
                                                            "data-id='" + index + indexBlock + indexField + optionIndex + "' " +
                                                            "data-order='1' data-index='" + index + "' " +
                                                            "data-index-option='" + optionIndex +"'" +
                                                            "data-select='true' " +
                                                            "data-index-field='" + indexField + "' data-index-block='" + indexBlock + "'" +
                                                            "value='" + option.value + "'  name='" + contentBlock.name + index + indexBlock + indexField + optionIndex + "[]'";

                                                        if (option.checked) {
                                                            inputField += " checked ";
                                                        }

                                                        inputField += ' />';

                                                        checkBoxItem += inputField + label + '</div>';
                                                        checkboxes += checkBoxItem;
                                                    });
                                                    checkboxes += '</div>';

                                                    divField += labelField;
                                                    divField += checkboxes;*/
                                                }
                                                else
                                                {
                                                    let checkBox='<div class="container">', checkBoxArea = '<div class="row checkbox"><div class="form-group col-lg-12 check-box-area">', label, input, extraDiv;
                                                    inputField = "<input type='" + contentField.type + "' " +
                                                        "id='" + contentField.name + index + indexBlock + indexField + contentFieldIndex + "1' " +
                                                        "data-id='" + index + indexBlock + indexField + contentFieldIndex + "' data-select='true' " +
                                                        "data-order='1' data-index-content='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                        " name='" + contentField.name + index + indexBlock + indexField + contentFieldIndex + "[]' " +
                                                        "data-extra-content='true'";

                                                    if (contentField.checked) {
                                                        inputField += " checked ";
                                                    }

                                                    inputField += ' />';

                                                    checkBoxArea += inputField + areaLabel + '</div></div>';
                                                    checkBox += checkBoxArea;

                                                    let extraContent = '<div class="row extra-content" data-index-content="1" data-id="' + index + indexBlock + indexField + contentFieldIndex + '" data-order="1">';
                                                    if('showExtraContent' in contentField && contentField.showExtraContent === false){
                                                        extraContent = '<div class="row extra-content hidden-extra-content" data-index-content="1" data-id="' + index + indexBlock + indexField + contentFieldIndex + '" data-order="1">';
                                                    }

                                                    contentField.extraContent.forEach(function (field, optionIndex) {
                                                        extraDiv = '<div class="form-group col-lg-6">';
                                                        inputGroup = '<div class="input-group mb-3">';
                                                        label = '<label for="' + field.name + index + indexBlock + indexField + contentFieldIndex + optionIndex + '1">' + field.label + '</label>';

                                                        input = "<input class='form-control' type='text' " +
                                                            "id='" + field.name + index + indexBlock + indexField + contentFieldIndex + optionIndex + "1' " +
                                                            "data-id='" + index + indexBlock + indexField + contentFieldIndex + optionIndex + "' " +
                                                            "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                            " placeholder='"+field.placeholder+"'  name='" + field.name + index + indexBlock + indexField + contentFieldIndex + optionIndex + "[]' ";

                                                        input += ' />';

                                                        if(field.type === "time")
                                                        {

                                                                input = "<input class='form-control' type='text' " +
                                                                    "id='" + field.name + index + indexBlock + indexField + contentFieldIndex + optionIndex + "1' " +
                                                                    "data-id='" + index + indexBlock + indexField + contentFieldIndex + optionIndex + "' " +
                                                                    "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                                    " data-target='time' placeholder='"+field.placeholder+"'  name='" + field.name + index + indexBlock + indexField + contentFieldIndex + optionIndex + "[]' ";

                                                                input += ' />';


                                                                inputGroup += input + '  <div class="input-group-append">' +
                                                                    ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                                                    ' </div></div>';

                                                                extraDiv += label + inputGroup;

                                                        }
                                                        else if(field.type === 'text') {
                                                            extraDiv += label + input;
                                                        }
                                                        else if(field.type === "select")
                                                        {
                                                            let select = "<select class='form-control' id='" + field.name + index + indexBlock + indexField + contentFieldIndex + optionIndex + "1' " +
                                                                "data-id='" + index + indexBlock + indexField + contentFieldIndex + optionIndex + "' " +
                                                                "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                                " name='" + field.name + index + indexBlock + indexField + contentFieldIndex + optionIndex + "[]' ";

                                                            if (field.required) {
                                                                select += "required ";
                                                            }

                                                            if (field.multiple) {
                                                                select += 'multiple ';
                                                            }

                                                            if ('exported' in field){
                                                                select += " data-exported='"+field.exported+"' ";
                                                            }

                                                            if ('imported' in field){
                                                                select += " data-imported='"+field.imported+"' ";
                                                            }

                                                            if ('pushToExtra' in field){
                                                                select += " data-push-extra='"+field.pushToExtra+"' ";
                                                            }

                                                            if ('pullToExtra' in field){
                                                                select += " data-pull-extra='"+field.pullToExtra+"' ";
                                                            }

                                                            select += ' >';
                                                            field.options.forEach(function (option) {
                                                                if('selected' in option && option.selected === true)
                                                                {
                                                                    select += "<option value='" + option.value + "' selected>" + option.label + "</option>";
                                                                }
                                                                else{
                                                                    select += "<option value='" + option.value + "'>" + option.label + "</option>";
                                                                }
                                                            });
                                                            select += "</select>";
                                                            extraDiv += label + select;
                                                        }
                                                        extraContent += extraDiv + '</div>';
                                                    });

                                                    checkBox += extraContent + '</div>';
                                                    areaDivField +=  checkBox + '</div>';
                                                }
                                                break;
                                        }

                                        areaDivField += '</div>';
                                        areaRow += areaDivField;
                                    });

                                    areaRow += '</div><hr></div></div>';
                                    divField += labelField;
                                    divField += areaRow   + areaButtons + '</div>';

                                    break;

                                case 'text':
                                    if (contentBlock.required) {
                                        inputField += "required ";
                                    }

                                    if ('exported' in contentBlock){
                                        inputField += " data-exported='"+contentBlock.exported+"' ";
                                    }

                                    if ('imported' in contentBlock){
                                        inputField += " data-imported='"+contentBlock.imported+"' ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }


                                    inputField += "type='" + contentBlock.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                        "data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField + "1'  " +
                                        "name='" + contentBlock.name + index + indexBlock + indexField + "[]' placeholder='" + contentBlock.placeholder + "' />";
                                    divField += inputField;
                                    break;

                                case 'paragraph':

                                        divField = '<div class="form-group col-lg-12" data-multiple="' + index + indexField + '" data-order="1">';

                                        paragraph += contentBlock.content + '</p>';

                                        divField += paragraph;

                                    break;

                                case 'tel':
                                    if (contentBlock.required) {
                                        inputField += "required ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }


                                    if ('grouped' in contentBlock && contentBlock.grouped) {
                                        divField = '<div class="form-group col-lg-12" data-index="' + index + '" data-block="' + indexBlock + '" ' +
                                            'data-multiple="' + index + indexBlock + indexField + '" data-order="1">';

                                        inputField += ' name="' + contentBlock.name + index + indexBlock + indexField + '[][]" ';

                                        inputField += "type='" + contentBlock.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                            "data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField + "1' " +
                                            "placeholder='" + contentBlock.placeholder + "' />";

                                        inputGroup += inputField + '  <div class="input-group-append">' +
                                            ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-child="true" ' +
                                            'data-id="' + index + indexBlock + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                            '</div></div></div>';

                                        divField+= labelField;
                                        divField += inputGroup;

                                    }
                                    else {
                                        inputField += ' name="' + contentBlock.name + index + indexBlock + indexField + '[]" ';

                                        inputField += "type='" + contentBlock.type + "' data-order='1' data-index='" + index + "' " +
                                            "data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                            "data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField + "1' " +
                                            "placeholder='" + contentBlock.placeholder + "' />";

                                        divField += inputField;
                                    }

                                    break;

                                case 'number':
                                    if (contentBlock.required) {
                                        inputField += "required ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }



                                    inputField += "type='" + contentBlock.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                        "data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField +"1'  " +
                                        "name='" + contentBlock.name + index + indexBlock + indexField + "[]' placeholder='" + contentBlock.placeholder + "' />";
                                    divField += inputField;
                                    break;

                                case 'file':
                                        inputField = "<input class='form-control input-error' ";
                                        labelField = "<label for='" + contentBlock.name + index + indexBlock + indexField + "1'>" + contentBlock.label + "</label>";

                                        if ('pushToExtra' in contentBlock){
                                            inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                        }

                                        if ('pullToExtra' in contentBlock){
                                            inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                        }

                                        if( 'fileType' in contentBlock && contentBlock.fileType === 'image' )
                                        {
                                            if (contentBlock.required) {
                                                inputField += "required ";
                                            }
                                            inputField += "type='" + contentBlock.type + "' data-id='" + index + indexBlock + indexField + "' data-type='"+contentBlock.fileType+"'" +
                                                "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                                "id='" + contentBlock.name + index + indexBlock + indexField + "1'  name='" + contentBlock.name + index + indexBlock + indexField + "[]' />";

                                            let uploadDiv = '<div class="upload-area">';

                                            uploadDiv += '<button type="button" data-btn-type="upload" class="btn btn-warning">Parcourir ...</button>';
                                            uploadDiv += inputField + '</div>';


                                            let controls = '<div class="btn-group btn-group-crop">' +
                                                '<button type="button" class="btn btn-outline-success btn-move"><i class="fa fa-arrows"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-valid"><i class="fa fa-check"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-refresh"><i class="fa fa-refresh"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-zoom-in"><i class="fa fa-search-plus"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-zoom-out"><i class="fa fa-search-minus"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-scale-x"><i class="fa fa-arrows-h"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-scale-y"><i class="fa fa-arrows-v"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-rotate-left"><i class="fa fa-undo"></i></button>' +
                                                '<button type="button" class="btn btn-outline-success btn-rotate-right"><i class="fa fa-repeat"></i></button>' +
                                                '</div>';

                                            let imgDiv = '<div class="upload-container img-thumbnail"><div class="div-upload-img" data-width="'+contentBlock.width+'" data-height="'+contentBlock.height+'"></div><div class="cropped-area"></div><div class="controls">' +
                                                controls + '</div></div>';


                                            divField = '<div class="form-group col-lg-12">' + labelField;
                                            divField += uploadDiv;
                                            divField += imgDiv;
                                        }
                                        else
                                        {


                                            if('grouped' in contentBlock && contentBlock.grouped)
                                            {
                                                divField = '<div class="form-group col-lg-12" data-index="' + index + '" data-block="' + indexBlock + '" ' +
                                                    'data-multiple="' + index + indexBlock + indexField + '" data-order="1">';

                                                inputField += "type='" + contentBlock.type + "' data-type='document' data-order='1' " +
                                                    "data-index='" + index + "' data-index-field='"+ indexField +"' " +
                                                    "data-index-block='"+ indexBlock +"' data-id='" + index + indexBlock + indexField + "' " +
                                                    "id='" + contentBlock.name + index + indexBlock + indexField + "1'  " +
                                                    "name='" + contentBlock.name + index + indexBlock + indexField + "[][]' />";

                                                let customInput = "<input type='text' placeholder='Parcourir ...' class='form-control input-error' readonly='readonly' " +
                                                    "data-custom='"+ index + indexField +"'>";
                                                inputGroup += '  <div class="input-group-prepend">' +
                                                    ' <button type="button" data-btn-type="upload-document" class="btn btn-warning" ' +
                                                    'data-id="'+ index + indexBlock + indexField +'"><i class="fa fa-folder-open"></i></button></div> ' + customInput + inputField;



                                                inputGroup +=  '  <div class="input-group-append">' +
                                                    ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-child="true" ' +
                                                    'data-id="' + index + indexBlock + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                                    '</div></div></div>';

                                                divField+= labelField;
                                                divField += inputGroup;
                                            }
                                            else
                                            {
                                                divField = '<div class="form-group col-lg-6" data-index="' + index + '" data-block="' + indexBlock + '" ' +
                                                    'data-multiple="' + index + indexBlock + indexField + '" data-order="1">';

                                                if (contentBlock.required) {
                                                    inputField += "required ";
                                                }

                                                inputField += "type='" + contentBlock.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' " +
                                                    "data-index-block='"+ indexBlock +"'" +
                                                    " data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField + "1'  " +
                                                    "name='" + contentBlock.name + index + indexBlock + indexField + "[]' />";

                                                let customInput = "<input type='text' placeholder='Parcourir ...' class='form-control input-error' readonly='readonly' " +
                                                    "data-custom='"+ index + indexBlock + indexField +"'>";
                                                inputGroup += '  <div class="input-group-prepend">' +
                                                    ' <button type="button" data-btn-type="upload-document" class="btn btn-warning" data-id="'+ index + indexBlock + indexField +'">' +
                                                    '<i class="fa fa-folder-open"></i></button></div> ' + customInput + inputField + ' </div>';

                                                divField += labelField;
                                                divField += inputGroup;
                                            }
                                        }
                                    break;

                                case 'date':
                                    if (contentBlock.required) {
                                        inputField += "required ";
                                    }

                                    if('minDate' in contentBlock) {
                                        inputField += ' data-min-date="true" ';
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }

                                    if ('grouped' in contentBlock && contentBlock.grouped) {

                                        divField = '<div class="form-group col-lg-6" data-multiple="' + index + indexBlock + indexField + '" ' +
                                            'data-index="' + index + '" data-block="' + indexBlock + '" data-order="1">';

                                        inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                            " data-id='" + index + indexBlock + indexField + "' " +
                                            "id='" + contentBlock.name + index + indexBlock + indexField + "1' data-target='date'  " +
                                            "name='" + contentBlock.name + index + indexBlock + indexField + "[][]'  placeholder='" + contentBlock.placeholder + "' />";

                                        inputGroup += inputField + '  <div class="input-group-append">' +
                                            ' <span class="input-group-text"><i class="fa fa-calendar"></i> </span>' +
                                            ' </div>' + inputField;

                                        inputGroup += '  <div class="input-group-append">' +
                                            ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-child="true" ' +
                                            'data-id="' + index + indexBlock + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                            '</div></div></div>';

                                        divField += labelField;

                                        divField += inputGroup;
                                    }
                                    else {
                                        inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                            " data-id='" + index + indexBlock + indexField + "' " +
                                            "id='" + contentBlock.name + index + indexBlock + indexField + "1' data-target='date'  " +
                                            "name='" + contentBlock.name + index + indexBlock + indexField + "[]'  placeholder='" + contentBlock.placeholder + "' />";

                                        inputGroup += inputField + '  <div class="input-group-append">' +
                                            ' <span class="input-group-text"><i class="fa fa-calendar"></i> </span>' +
                                            ' </div></div>';
                                        divField += inputGroup;
                                    }


                                    break;

                                case 'time':
                                    if (contentBlock.required) {
                                        inputField += "required ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }

                                    if ('grouped' in contentBlock && contentBlock.grouped) {

                                        divField = '<div class="form-group col-lg-6" data-multiple="' + index + indexField + '" data-order="1"' +
                                            ' data-index="' + index + '" data-block="' + indexBlock + '">';

                                        inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                            " data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField + "1' data-target='time'  " +
                                            "name='" + contentBlock.name + index + indexBlock + indexField + "[][]'  placeholder='" + contentBlock.placeholder + "' />";

                                        inputGroup +=  '  <div class="input-group-prepend">' +
                                            ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                            ' </div>'+ inputField;

                                        inputGroup += '  <div class="input-group-append">' +
                                            ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-child="true" data-id="' + index + indexBlock + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                            '</div></div></div>';

                                        divField += labelField;

                                        divField += inputGroup;
                                    }
                                    else {
                                        inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                            " data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField + "1' " +
                                            "data-target='time'  name='" + contentBlock.name + index + indexBlock + indexField + "[]'  placeholder='" + contentBlock.placeholder + "' />";

                                        inputGroup += inputField + '  <div class="input-group-append">' +
                                            ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                            ' </div></div>';
                                        divField += inputGroup;
                                    }


                                    break;

                                case 'email':
                                    if (contentBlock.required) {
                                        inputField += "required ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }



                                    if ('grouped' in contentBlock && contentBlock.grouped) {
                                        divField = '<div class="form-group col-lg-6" data-multiple="' + index + indexBlock + indexField + '" data-order="1"' +
                                            ' data-index="' + index + '" data-block="' + indexBlock + '">';

                                        inputField += ' name="' + contentBlock.name + index + indexBlock + indexField + '[][]" ';

                                        inputField += "type='" + contentBlock.type + "' " +
                                            "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                            " data-id='" + index + indexBlock + indexField + "' " +
                                            "id='" + contentBlock.name + index + indexBlock + indexField + "1' placeholder='" + contentBlock.placeholder + "' />";

                                        inputGroup += inputField + '  <div class="input-group-append">' +
                                            ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-child="true" data-id="' + index + indexBlock + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                            '</div></div></div>';

                                        divField+= labelField;
                                        divField += inputGroup;

                                    }
                                    else {
                                        inputField += ' name="' + contentBlock.name + index + indexBlock + indexField +'[]"';

                                        inputField += "type='" + contentBlock.type + "' data-order='1' data-index='" + index + "' " +
                                            "data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                            "data-id='" + index + indexBlock + indexField + "' " +
                                            "id='" + contentBlock.name + index + indexBlock + indexField + "1' placeholder='" + contentBlock.placeholder + "' />";

                                        divField += inputField;
                                    }


                                    break;

                                case 'password':
                                    let helpText = '';
                                    if('helpText' in contentBlock){
                                        helpText += '<small class="form-text text-muted">'+contentBlock.helpText+' <small class="font-weight-bold"></small></small>'
                                    }
                                    if (contentBlock.required) {
                                        inputField += "required ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }

                                    inputField += "type='" + contentBlock.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                        " data-id='" + index + indexBlock + indexField + "' id='" + contentBlock.name + index + indexBlock + indexField + "1'" +
                                        "  name='" + contentBlock.name + index + indexBlock + indexField + "[]' placeholder='" + contentBlock.placeholder + "' />";
                                    inputGroup += inputField + '  <div class="input-group-append">' +
                                        ' <button type="button" class="btn btn-outline-secondary btn-password"><i class="fa fa-eye"></i> </button>' +
                                        ' </div></div>';


                                    divField += inputGroup + helpText;
                                    break;

                                case 'checkbox':
                                    labelField = "<label for='" + contentBlock.name + index + indexBlock + indexField + "1'>" + contentBlock.label + "</label>"

                                    divField = '<div class="form-group col-lg-12">';
                                    if(contentBlock.multiple)
                                    {
                                        let checkboxes = '<div class="checkboxes" data-index="'+ index +'" data-order="1">', checkBoxItem;
                                        contentBlock.options.forEach(function (option, optionIndex) {
                                            checkBoxItem = '<div class="check-box-area">';
                                            label = '<label for="' + contentBlock.name + index + indexBlock + indexField + optionIndex + '1">' + option.label + '</label>';
                                            inputField = "<input type='" + contentBlock.type + "' " +
                                                "id='" + contentBlock.name + index + indexBlock + indexField + optionIndex + "1' " +
                                                "data-id='" + index + indexBlock + indexField + optionIndex + "' " +
                                                "data-order='1' data-index='" + index + "' " +
                                                "data-index-option='" + optionIndex +"'" +
                                                "data-select='true' " +
                                                "data-index-field='" + indexField + "' data-index-block='" + indexBlock + "'" +
                                                "value='" + option.value + "'  name='" + contentBlock.name + index + indexBlock + indexField + optionIndex + "[]'";

                                            if (option.checked) {
                                                inputField += " checked ";
                                            }

                                            inputField += ' />';

                                            checkBoxItem += inputField + label + '</div>';
                                            checkboxes += checkBoxItem;
                                        });
                                        checkboxes += '</div>';

                                        divField += labelField;
                                        divField += checkboxes;
                                    }
                                    else
                                    {
                                        let checkBox='<div class="container">', checkBoxArea = '<div class="row checkbox"><div class="form-group col-lg-12 check-box-area">', label, input, extraDiv;
                                        inputField = "<input type='" + contentBlock.type + "' " +
                                            "id='" + contentBlock.name + index + indexBlock + indexField  + "1' " +
                                            "data-id='" + index + indexBlock + indexField + "' data-select='true' " +
                                            "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                            " name='" + contentBlock.name + index + indexBlock + indexField + "[]' " +
                                            "data-extra-content='true'";

                                        if (contentBlock.checked) {
                                            inputField += " checked ";
                                        }

                                        inputField += ' />';

                                        checkBoxArea += inputField + labelField + '</div></div>';
                                        checkBox += checkBoxArea;

                                        let extraContent = '<div class="row extra-content" data-id="' + index + indexBlock + indexField + '" data-order="1">';
                                        if('showExtraContent' in contentBlock && contentBlock.showExtraContent === false){
                                            extraContent = '<div class="row extra-content hidden-extra-content" data-id="' + index + indexBlock + indexField + '" data-order="1">';
                                        }

                                        contentBlock.extraContent.forEach(function (field, optionIndex) {
                                             extraDiv = '<div class="form-group col-lg-6">';
                                             inputGroup = '<div class="input-group mb-3">';
                                             label = '<label for="' + field.name + index + indexBlock + indexField + optionIndex + '1">' + field.label + '</label>';


                                            input = "<input class='form-control' type='text' " +
                                                "id='" + field.name + index + indexBlock + indexField + optionIndex + "1' " +
                                                "data-id='" + index + indexBlock + indexField + optionIndex + "' " +
                                                "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                " placeholder='"+field.placeholder+"'  name='" + field.name + index + indexBlock + indexField + optionIndex + "[]' ";


                                            if('required' in field && field.required){
                                                input += " required ";
                                            }

                                            if ('pushToExtra' in field){
                                                input += " data-push-extra='"+field.pushToExtra+"' ";
                                            }

                                            if ('pullToExtra' in field){
                                                input += " data-pull-extra='"+field.pullToExtra+"' ";
                                            }

                                            if ('exported' in field){
                                                input += " data-exported='"+field.exported+"' ";
                                            }

                                            if ('imported' in field){
                                                input += " data-imported='"+field.imported+"' ";
                                            }

                                            input += ' />';

                                            if(field.type === 'time')
                                            {

                                                    input = "<input class='form-control' type='text' " +
                                                        "id='" + field.name + index + indexBlock + indexField + optionIndex + "1' " +
                                                        "data-id='" + index + indexBlock + indexField + optionIndex + "' " +
                                                        "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                        " data-target='time' placeholder='"+field.placeholder+"'  name='" + field.name + index + indexBlock + indexField + optionIndex + "[]' ";

                                                    if ('pushToExtra' in field){
                                                        input += " data-push-extra='"+field.pushToExtra+"' ";
                                                    }

                                                    if ('pullToExtra' in field){
                                                        input += " data-pull-extra='"+field.pullToExtra+"' ";
                                                    }

                                                    input += ' />';


                                                    inputGroup += input + '  <div class="input-group-append">' +
                                                        ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                                        ' </div></div>';

                                                    extraDiv += label + inputGroup;



                                            }
                                            else if(field.type === 'text') {
                                                extraDiv += label + input;
                                            }
                                            else if(field.type === "select")
                                            {
                                                let select = "<select class='form-control' id='" + field.name + index + indexBlock + indexField + optionIndex + "1' " +
                                                    "data-id='" + index + indexBlock + indexField + optionIndex + "' " +
                                                    "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                                    " name='" + field.name + index + indexBlock + indexField + optionIndex + "[]' ";

                                                if (field.required) {
                                                    select += "required ";
                                                }

                                                if (field.multiple) {
                                                    select += 'multiple ';
                                                }

                                                if ('exported' in field){
                                                    select += " data-exported='"+field.exported+"' ";
                                                }

                                                if ('imported' in field){
                                                    select += " data-imported='"+field.imported+"' ";
                                                }

                                                if ('pushToExtra' in field){
                                                    select += " data-push-extra='"+field.pushToExtra+"' ";
                                                }

                                                if ('pullToExtra' in field){
                                                    select += " data-pull-extra='"+field.pullToExtra+"' ";
                                                }


                                                select += ' >';
                                                field.options.forEach(function (option) {
                                                    if('selected' in option && option.selected === true)
                                                    {
                                                        select += "<option value='" + option.value + "' selected>" + option.label + "</option>";
                                                    }
                                                    else{
                                                        select += "<option value='" + option.value + "'>" + option.label + "</option>";
                                                    }
                                                });
                                                select += "</select>";
                                                extraDiv += label + select;
                                            }



                                            extraContent += extraDiv + '</div>';
                                        });

                                        checkBox += extraContent + '</div>';
                                        divField +=  checkBox + '</div>';
                                    }
                                    break;

                                case 'textarea':
                                    if (contentBlock.required) {
                                        textField += "required ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        inputField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        inputField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }


                                    textField += "rows='" + contentBlock.rows + "' data-index='" + index + "' data-id='" + index + indexBlock + indexField + "' " +
                                        "id='" + contentBlock.name + index + indexBlock + indexField + "1' name='" + contentBlock.name + index + indexBlock + indexField + "[]' " +
                                        "placeholder='" + contentBlock.placeholder + "'></textarea>";
                                    divField = '<div class="form-group col-lg-12">';
                                    divField += labelField;
                                    divField += textField;


                                    break;

                                case 'select':
                                    if (contentBlock.required) {
                                        selectField += "required ";
                                    }

                                    if (contentBlock.multiple) {
                                        selectField += 'multiple ';
                                    }

                                    if ('exported' in contentBlock){
                                        selectField += " data-exported='"+contentBlock.exported+"' ";
                                    }

                                    if ('imported' in contentBlock){
                                        selectField += " data-imported='"+contentBlock.imported+"' ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        selectField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        selectField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }


                                    selectField += "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"' " +
                                        "data-id='" + index + indexBlock + indexField + "' " +
                                        "id='" + contentBlock.name + index + indexBlock + indexField + "1' name='" + contentBlock.name + index + indexBlock + indexField + "[]'>";
                                    contentBlock.options.forEach(function (option) {
                                        if('selected' in option && option.selected === true)
                                        {
                                            selectField += "<option value='" + option.value + "' selected>" + option.label + "</option>";
                                        }
                                        else{
                                            selectField += "<option value='" + option.value + "'>" + option.label + "</option>";
                                        }
                                    });
                                    selectField += "</select>";
                                    divField += selectField;

                                    break;

                                case 'country':
                                    if (contentBlock.required) {
                                        selectField += "required ";
                                    }

                                    if ('pushToExtra' in contentBlock){
                                        selectField += " data-push-extra='"+contentBlock.pushToExtra+"' ";
                                    }

                                    if ('pullToExtra' in contentBlock){
                                        selectField += " data-pull-extra='"+contentBlock.pullToExtra+"' ";
                                    }


                                    selectField += "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                        " data-id='" + index + indexBlock + indexField + "' " +
                                        "id='" + contentBlock.name + index + indexBlock + indexField + "1' name='" + contentBlock.name + index + indexBlock + indexField + "[]'>";
                                    countries.forEach(function (country) {
                                        selectField += "<option value='" + country + "'>" + country + "</option>";
                                    });
                                    selectField += "</select>";
                                    divField += selectField;

                                    break;

                                case 'radio':
                                    let radios = '<div class="radios">', radioItem;
                                    contentBlock.options.forEach(function (option, indexOption) {
                                        radioItem = '<div class="radio-item">';
                                        label = '<label for="' + contentBlock.name + index + indexBlock + indexField + indexOption + '1">' + option.label + '</label>';
                                        inputField = "<input type='" + contentBlock.type + "' data-id='" + index + indexBlock + indexField + "' " +
                                            "id='" + contentBlock.name + index + indexBlock + indexField + indexOption + "1' value='" + option.value + "'  " +
                                            "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-index-block='"+ indexBlock +"'" +
                                            "name='" + contentBlock.name + index + indexBlock + indexField + "'[]";

                                        if (contentBlock.required) {
                                            inputField += " required ";
                                        }

                                        if (option.checked) {
                                            inputField += " checked ";
                                        }

                                        inputField += ' />';

                                        radioItem += inputField + label + '</div>';
                                        radios += radioItem;
                                    });
                                    radios += '</div>';
                                    divField = '<div class="form-group col-lg-12">';
                                    divField += labelField;
                                    divField += radios;

                                    break;
                            }

                            divField += '</div>';
                            row += divField;
                        });

                        divGroup += row + '</div><hr>' + '</div>';
                        divBlock += divGroup + '</div>'+ divGroupButtons +'</div>';
                        stepContent += divBlock;
                    });

                }
                else {
                    section.sectionContent.forEach(function (sectionField, indexField) {
                        let divField = '<div class="form-group col-lg-6">';
                        let inputGroup = '<div class="input-group mb-3">';
                        let labelField = "<label data-select='true' for='" + sectionField.name + index + indexField + "1'>" + sectionField.label + "</label>", label;
                        let inputField = "<input class='form-control input-error' ",
                            textField = "<textarea class='form-control' ",
                            selectField = "<select class='form-control' ",
                            paragraph = '<p>';

                        divField += labelField;

                        switch (sectionField.type) {

                            case 'text':
                                if (sectionField.required) {
                                    inputField += "required ";
                                }

                                if ('exported' in sectionField){
                                    inputField += " data-exported='"+sectionField.exported+"' ";
                                }

                                if ('imported' in sectionField){
                                    inputField += " data-imported='"+sectionField.imported+"' ";
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                if ('grouped' in sectionField && sectionField.grouped) {
                                    divField = '<div class="form-group col-lg-12" data-multiple="' + index + indexField + '" data-order="1">';

                                    inputField += ' name="' + sectionField.name + index + '[]" ';

                                    inputField += "type='" + sectionField.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' placeholder='" + sectionField.placeholder + "' />";

                                    inputGroup += inputField + '  <div class="input-group-append">' +
                                        ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-max-fields="'+sectionField.maxFields+'" data-child="true" data-id="' + index + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                        '</div></div></div>';

                                    divField += labelField;

                                    divField += inputGroup;
                                }
                                else {

                                    inputField += ' name="' + sectionField.name + index + '"';

                                    inputField += "type='" + sectionField.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' placeholder='" + sectionField.placeholder + "' />";

                                    divField += inputField;
                                }




                                break;

                            case 'paragraph':

                                divField = '<div class="form-group col-lg-12" data-multiple="' + index + indexField + '" data-order="1">';

                                paragraph += sectionField.content + '</p>';

                                divField += paragraph;

                                break;

                            case 'tel':
                                if (sectionField.required) {
                                    inputField += "required ";
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                if ('grouped' in sectionField && sectionField.grouped) {
                                    divField = '<div class="form-group col-lg-12" data-multiple="' + index + indexField + '" data-order="1">';

                                    inputField += ' name="' + sectionField.name + index + indexField + '[]" ';

                                    inputField += " type='" + sectionField.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' placeholder='" + sectionField.placeholder + "' />";

                                    inputGroup += inputField + '  <div class="input-group-append">' +
                                        ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-child="true" data-id="' + index + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                        '</div></div></div>';

                                    divField += labelField;

                                    divField += inputGroup;
                                }
                                else {
                                    inputField += ' name="' + sectionField.name + index +'"';

                                    inputField += "type='" + sectionField.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' placeholder='" + sectionField.placeholder + "' />";

                                    divField += inputField;
                                }


                                break;

                            case 'number':
                                if (sectionField.required) {
                                    inputField += "required ";
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                inputField += " type='" + sectionField.type + "'  data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1'  name='" + sectionField.name + index + "' placeholder='" + sectionField.placeholder + "' />";
                                divField += inputField;
                                break;

                            case 'file':
                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }
                                if( 'fileType' in sectionField && sectionField.fileType === 'image' )
                                {
                                    if (sectionField.required) {
                                        inputField += "required ";
                                    }
                                    inputField += " type='" + sectionField.type + "' data-type='"+sectionField.fileType+"' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' id='" + sectionField.name + index + indexField + "1'  name='" + sectionField.name + index + "' />";

                                    let uploadDiv = '<div class="upload-area">';

                                    uploadDiv += '<button type="button" data-btn-type="upload" class="btn btn-warning">Parcourir ...</button>';
                                    uploadDiv += inputField + '</div>';

                                    let controls = '<div class="btn-group btn-group-crop">' +
                                        '<button type="button" class="btn btn-outline-success btn-move"><i class="fa fa-arrows"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-valid"><i class="fa fa-check"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-refresh"><i class="fa fa-refresh"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-zoom-in"><i class="fa fa-search-plus"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-zoom-out"><i class="fa fa-search-minus"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-scale-x"><i class="fa fa-arrows-h"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-scale-y"><i class="fa fa-arrows-v"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-rotate-left"><i class="fa fa-undo"></i></button>' +
                                        '<button type="button" class="btn btn-outline-success btn-rotate-right"><i class="fa fa-repeat"></i></button>' +
                                        '</div>';

                                    let imgDiv = '<div class="upload-container img-thumbnail"><div class="div-upload-img" data-width="'+sectionField.width+'" data-height="'+sectionField.height+'"></div><div class="cropped-area"></div><div class="controls">' +
                                        controls + '</div></div>';


                                    divField = '<div class="form-group col-lg-12">';
                                    divField += uploadDiv;
                                    divField += imgDiv;
                                }
                                else
                                {
                                    if (sectionField.required) {
                                        inputField += "required ";
                                    }

                                    if('grouped' in sectionField && sectionField.grouped)
                                    {
                                        divField = '<div class="form-group col-lg-6" data-multiple="' + index + indexField + '" data-order="1">';

                                        inputField += " type='" + sectionField.type + "' data-type='document' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1'  name='" + sectionField.name + index + "[]' />";

                                        let customInput = "<input type='text' data-order='1' placeholder='Parcourir ...' class='form-control input-error' readonly='readonly' data-custom='"+ index + indexField +"'>";
                                        inputGroup += '  <div class="input-group-prepend">' +
                                            ' <button type="button" data-btn-type="upload-document" data-order="1" class="btn btn-warning" data-id="'+ index + indexField +'"><i class="fa fa-folder-open"></i></button></div> ' + customInput + inputField;



                                        inputGroup +=  '  <div class="input-group-append">' +
                                            ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-max-fields="'+sectionField.maxFields+'" data-child="true" data-id="' + index + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                            '</div></div></div>';

                                        divField += labelField;

                                        divField += inputGroup;
                                    }
                                    else
                                    {
                                        inputField += "type='" + sectionField.type + "' data-type='document' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1'  name='" + sectionField.name + index + "' />";

                                        let customInput = "<input type='text' placeholder='Parcourir ...' class='form-control input-error' readonly='readonly' data-custom='"+ index + indexField +"'>";
                                        inputGroup += '  <div class="input-group-prepend">' +
                                            ' <button type="button" data-btn-type="upload-document" class="btn btn-warning" data-id="'+ index + indexField +'"><i class="fa fa-folder-open"></i></button></div> ' + customInput + inputField + ' </div>';

                                        divField = '<div class="form-group col-lg-12">';
                                        divField += labelField;
                                        divField += inputGroup;
                                    }
                                }


                                break;

                            case 'date':
                                if (sectionField.required) {
                                    inputField += "required ";
                                }

                                if('minDate' in sectionField) {
                                    inputField += ' data-min-date="true" ';
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }

                                if ('grouped' in sectionField && sectionField.grouped) {

                                    divField = '<div class="form-group col-lg-6" data-multiple="' + index + indexField + '" data-order="1">';

                                    inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' data-target='date'  name='" + sectionField.name + index + "[]'  placeholder='" + sectionField.placeholder + "' />";

                                    inputGroup += inputField + '  <div class="input-group-append">' +
                                        ' <span class="input-group-text"><i class="fa fa-calendar"></i> </span>' +
                                        ' </div>' + inputField;

                                    inputGroup += '  <div class="input-group-append">' +
                                        ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-child="true" data-id="' + index + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                        '</div></div></div>';

                                    divField += labelField;

                                    divField += inputGroup;
                                }
                                else {
                                    inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' data-target='date'  name='" + sectionField.name + index + "'  placeholder='" + sectionField.placeholder + "' />";

                                    inputGroup += inputField + '  <div class="input-group-append">' +
                                        ' <span class="input-group-text"><i class="fa fa-calendar"></i> </span>' +
                                        ' </div></div>';
                                    divField += inputGroup;
                                }


                                break;

                            case 'time':
                                if (sectionField.required) {
                                    inputField += "required ";
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }

                                if ('grouped' in sectionField && sectionField.grouped) {

                                    divField = '<div class="form-group col-lg-6" data-multiple="' + index + indexField + '" data-order="1">';

                                    inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' data-target='time'  name='" + sectionField.name + index + "[]'  placeholder='" + sectionField.placeholder + "' />";

                                    inputGroup +=  '  <div class="input-group-prepend">' +
                                        ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                        ' </div>'+ inputField;

                                    inputGroup += '  <div class="input-group-append">' +
                                        ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-max-fields="'+sectionField.maxFields+'" data-child="true" data-id="' + index + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                        '</div></div></div>';

                                    divField += labelField;

                                    divField += inputGroup;
                                }
                                else {
                                    inputField += "type='text' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' data-target='time'  name='" + sectionField.name + index + "'  placeholder='" + sectionField.placeholder + "' />";

                                    inputGroup += inputField + '  <div class="input-group-append">' +
                                        ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                        ' </div></div>';
                                    divField += inputGroup;
                                }

                                break;

                            case 'email':

                                if (sectionField.required) {
                                    inputField += "required ";
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                if ('grouped' in sectionField && sectionField.grouped) {
                                    divField = '<div class="form-group col-lg-12" data-multiple="' + index + indexField + '" data-order="1">';

                                    inputField += ' name="' + sectionField.name + index + '[]" ';

                                    inputField += "type='" + sectionField.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' placeholder='" + sectionField.placeholder + "' />";

                                    inputGroup += inputField + '  <div class="input-group-append">' +
                                        ' <div class="btn-group"><button type="button" class="btn btn-outline-success btn-addField" data-max-fields="'+sectionField.maxFields+'" data-child="true" data-id="' + index + indexField + '" data-order="1"><i class="fa fa-plus-circle"></i> </button>' +
                                        '</div></div></div>';

                                    divField += labelField;

                                    divField += inputGroup;
                                }
                                else {
                                    divField = '<div class="form-group col-lg-12">';
                                    inputField += ' name="' + sectionField.name + index + '"';

                                    inputField += "type='" + sectionField.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' placeholder='" + sectionField.placeholder + "' />";

                                    divField += labelField;

                                    divField += inputField;
                                }
                                break;

                            case 'password':
                                let helpText = '';
                                if('helpText' in sectionField){
                                    helpText += '<small class="form-text text-muted">'+sectionField.helpText+' <small class="font-weight-bold"></small></small>'
                                }

                                if (sectionField.required) {
                                    inputField += "required ";
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                inputField += "type='" + sectionField.type + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1'  name='" + sectionField.name + index + "' placeholder='" + sectionField.placeholder + "' />";
                                inputGroup += inputField + '  <div class="input-group-append">' +
                                    ' <button type="button" class="btn btn-outline-secondary btn-password"><i class="fa fa-eye"></i> </button>' +
                                    ' </div></div>';
                                divField = '<div class="form-group col-lg-12">';
                                divField += labelField;
                                divField += inputGroup + helpText;
                                break;

                            case 'checkbox':

                                divField = '<div class="form-group col-lg-12">';
                                if('options' in sectionField)
                                {
                                    let checkboxes = '<div class="checkboxes">', checkBoxItem;
                                    sectionField.options.forEach(function (option, optionIndex) {
                                        checkBoxItem = '<div class="check-box-area">';
                                        label = '<label for="' + sectionField.name + index + indexField + optionIndex + '1">' + option.label + '</label>';
                                        inputField = "<input type='" + sectionField.type + "' " +
                                            "id='" + sectionField.name + index + indexField + optionIndex + "1' " +
                                            "data-id='" + index + indexField + optionIndex + "' " +
                                            "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' " +
                                            "value='" + option.value + "'  name='" + sectionField.name + index + indexField + "[]'";

                                        if (option.checked) {
                                            inputField += " checked ";
                                        }

                                        inputField += ' />';

                                        checkBoxItem += inputField + label + '</div>';
                                        checkboxes += checkBoxItem;
                                    });
                                    checkboxes += '</div>';

                                    divField += labelField;
                                    divField += checkboxes;
                                }
                                else
                                {
                                    let checkBox='<div class="container">', checkBoxArea = '<div class="row checkbox"><div class="form-group col-lg-12 check-box-area">', label, input, extraDiv;
                                    inputField = "<input type='" + sectionField.type + "' " +
                                        "id='" + sectionField.name + index + indexField  + "1' " +
                                        "data-id='" + index + indexField + "' " +
                                        "data-order='1' data-index-content='1' data-index='" + index + "' data-index-field='"+ indexField +"' " +
                                        "value='" + sectionField.value + "'  name='" + sectionField.name + index + indexField + "[]' " +
                                        "data-extra-content='true'";

                                    if (sectionField.checked) {
                                        inputField += " checked ";
                                    }

                                    inputField += ' />';

                                    checkBoxArea += inputField + labelField + '</div></div>';
                                    checkBox += checkBoxArea;

                                    let extraContent = '<div class="row extra-content" data-index-content="1" data-id="' + index + indexField + '" data-order="1">';
                                    if('showExtraContent' in sectionField && sectionField.showExtraContent === false){
                                        extraContent = '<div class="row extra-content hidden-extra-content" data-index-content="1" data-id="' + index + indexField + '" data-order="1">';
                                    }

                                    sectionField.extraContent.forEach(function (field, optionIndex) {
                                        extraDiv = '<div class="form-group col-lg-6">';
                                        inputGroup = '<div class="input-group mb-3">';
                                        label = '<label for="' + field.name + index + indexField + optionIndex + '1">' + field.label + '</label>';

                                        input = "<input class='form-control' type='text' " +
                                            "id='" + field.name + index + indexField + optionIndex + "1' " +
                                            "data-id='" + index + indexField + optionIndex + "' " +
                                            "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' " +
                                            " placeholder='"+field.placeholder+"'  name='" + field.name + index + indexField + optionIndex + "[]' ";

                                        if('required' in field && field.required){
                                            input += " required ";
                                        }

                                        if ('pushToExtra' in field){
                                            input += " data-push-extra='"+field.pushToExtra+"' ";
                                        }

                                        if ('pullToExtra' in field){
                                            input += " data-pull-extra='"+field.pullToExtra+"' ";
                                        }

                                        input += ' />';



                                        if(field.name.indexOf('time') !== -1)
                                        {
                                            input = "<input class='form-control' type='text' " +
                                                "id='" + field.name + index + indexField + optionIndex + "1' " +
                                                "data-id='" + index + indexField + optionIndex + "' " +
                                                "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' " +
                                                " data-target='time' placeholder='"+field.placeholder+"'  name='" + field.name + index + indexField + optionIndex + "[]' ";

                                            if ('pushToExtra' in field){
                                                input += " data-push-extra='"+field.pushToExtra+"' ";
                                            }

                                            if ('pullToExtra' in field){
                                                input += " data-pull-extra='"+field.pullToExtra+"' ";
                                            }

                                            input += ' />';

                                            inputGroup += input + '  <div class="input-group-append">' +
                                                ' <span class="input-group-text"><i class="fa fa-clock-o"></i> </span>' +
                                                ' </div></div>';
                                        }
                                        else
                                        {
                                            extraDiv += label + input;
                                        }


                                        extraContent += extraDiv + '</div>';
                                    });

                                    checkBox += extraContent + '</div>';
                                    divField +=  checkBox + '</div>';
                                }


                                break;

                            case 'textarea':
                                if (sectionField.required) {
                                    textField += "required ";
                                }

                                if ('pushToExtra' in sectionField){
                                    inputField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    inputField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                textField += "rows='" + sectionField.rows + "' data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' name='" + sectionField.name + index + "' placeholder='" + sectionField.placeholder + "'></textarea>";
                                divField = '<div class="form-group col-lg-12">';
                                divField += labelField;
                                divField += textField;
                                break;

                            case 'select':
                                if (sectionField.required) {
                                    selectField += "required ";
                                }

                                if (sectionField.multiple) {
                                    selectField += 'multiple ';
                                }

                                if ('exported' in sectionField){
                                    selectField += " data-exported='"+sectionField.exported+"' ";
                                }

                                if ('imported' in sectionField){
                                    selectField += " data-imported='"+sectionField.imported+"' ";
                                }

                                if ('pushToExtra' in sectionField){
                                    selectField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    selectField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                selectField += "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' name='" + sectionField.name + index + "'>";
                                sectionField.options.forEach(function (option) {
                                    if('selected' in option && option.selected === true)
                                    {
                                        selectField += "<option value='" + option.value + "' selected>" + option.label + "</option>";
                                    }
                                    else{
                                        selectField += "<option value='" + option.value + "'>" + option.label + "</option>";
                                    }
                                });
                                selectField += "</select>";
                                divField += selectField;

                                break;

                            case 'country':
                                if (sectionField.required) {
                                    selectField += "required ";
                                }

                                if ('pushToExtra' in sectionField){
                                    selectField += " data-push-extra='"+sectionField.pushToExtra+"' ";
                                }

                                if ('pullToExtra' in sectionField){
                                    selectField += " data-pull-extra='"+sectionField.pullToExtra+"' ";
                                }


                                selectField += "data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' id='" + sectionField.name + index + indexField + "1' name='" + sectionField.name + index + "'>";
                                countries.forEach(function (country) {
                                    selectField += "<option value='" + country + "'>" + country + "</option>";
                                });
                                selectField += "</select>";
                                divField += selectField;

                                break;

                            case 'radio':
                                let radios = '<div class="radios">', radioItem;
                                sectionField.options.forEach(function (option, optionIndex) {
                                    radioItem = '<div class="radio-item">';
                                    label = '<label for="' + sectionField.name + optionIndex + index + indexField + '">' + option.label + '</label>';

                                    if(parseInt(section.nextStep) !== -1)
                                    {
                                        inputField = "<input data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' data-break-from='"+ index +"' data-break='"+option.pageBreak+"' data-step-break='"+section.nextStep+"' type='" + sectionField.type + "' id='" + sectionField.name + optionIndex + index + indexField + "' value='" + option.value + "'  name=" + sectionField.name + index + '"';
                                    }
                                    else
                                    {
                                        inputField = "<input data-order='1' data-index='" + index + "' data-index-field='"+ indexField +"' data-id='" + index + indexField + "' type='" + sectionField.type + "' id='" + sectionField.name + optionIndex + index + indexField + "' value='" + option.value + "'  name=" + sectionField.name + index + '"';
                                    }


                                    if (sectionField.required) {
                                        inputField += " required ";
                                    }

                                    if (option.checked) {
                                        inputField += " checked ";
                                    }

                                    inputField += ' />';

                                    radioItem += inputField + label + '</div>';
                                    radios += radioItem;
                                });
                                radios += '</div>';
                                divField = '<div class="form-group col-lg-12">';
                                divField += labelField;
                                divField += radios;

                                break;
                        }

                        divField += '</div>';
                        row += divField;
                    });

                    stepContent += row + '</div>';
                }

                $('form').find('.form-steps-content').append(stepContent);

                $('form').find('input[type="tel"]').intlTelInput({
                    initialCountry: "fr",
                    geoIpLookup: function(success, failure) {
                        $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                            var countryCode = (resp && resp.country) ? resp.country : "";
                            success(countryCode);
                        });
                    },
                    utilsScript: "utils.js"
                });

                if($('form').find('input[type="tel"]').attr('placeholder')){
                    var mask1 = $('form').find('input[type="tel"]').attr('placeholder').replace(/[0-9]/g, 0);
                    $('form').find('input[type="tel"]').mask(mask1);
                }
            });
        }
    });

    $(document).on('click', '.btn-password', function () {
        $(this).children('i').toggleClass('fa-eye').toggleClass('fa-eye-slash');

        $(this).parent().prev().attr('data-target', 'password');
        if ($(this).parent().prev().attr('type') === "text") {
            $(this).parent().prev().attr('type', 'password');
        }
        else {
            $(this).parent().prev().attr('type', 'text');
        }
    });

    $(document).on('click', '.btn-next', function () {

        let id = parseInt($(this).data('id')), next, steps = $(this).data('steps'), print = false;
        next = id + 1;

        let fields = $('[data-index="' + id + '"]');

        if(!validate(fields)){
            alert('Veuillez renseigner les champs obligatoires');
            return 0;
        }

        if(!checkValidity(fields)){
            alert('Veuillez vérifier les champs renseignés');
            return 0;
        }


        let breakPage = $('input[type="radio"][data-break="true"][data-index="'+ id +'"]')[0], isBreak = false;
        if(breakPage !== undefined && $(breakPage).is(':checked'))
        {
            next = parseInt($(breakPage).attr('data-step-break'));
            isBreak = true;

            for(let i = 0; i < next; i++){
                if(!$('span[data-order-step="' + i + '"]').hasClass('active')){
                    $('span[data-order-step="' + i + '"]').addClass('active');
                }
            }
        }

        let nextStepIndicator = $('span[data-order-step="' + next + '"]'),
            tabContent = $('#step' + id),
            nextTabContent = $('#step' + next);

        if(tabContent.attr('data-print') === 'true'){
            let checkedBox = tabContent.find('input[type="checkbox"][data-extra-content][data-index="'+id+'"]')
            if(checkedBox.attr('checked'))
            {
                alert('Rappel: Veuillez télécharger vos documents si vous les avez pas !')
            }
        }


        if(nextTabContent.attr('data-print') === 'true'){
            print = true;
        }


        if(tabContent.attr('data-resume') === 'true'){
            let
             tr = '<tr>', th, td, done, fields,
             tabBlocks = tabContent.find('.block-tabs').find('.tab-pane'),
                labels = $(tabBlocks[0]).find('label[data-select="true"]');
            $('#tabRecap #theadRecap tr').empty();
            $('#tabRecap #tbodyRecap').empty();

            for(let i = 0; i< labels.length; i++){
                th = '<th>' + $(labels[i]).text() + '</th>';
                $('#tabRecap #theadRecap tr').append(th);
            }


            for(let i = 0; i< tabBlocks.length; i++){
                tr = '<tr>';
                fields = $(tabBlocks[i]).find('input[data-select="true"][type!="checkbox"], textarea[data-select="true"], select[data-select="true"]');
                labels = $(tabBlocks[i]).find('label[data-select="true"]');
                done = false;

                for(let j = 0; j< fields.length; j++){
                    td = '<td>' + $(fields[j]).val() + '</td>';
                    tr += td;
                }
                tr += '</tr>';
                $('#tabRecap #tbodyRecap').append(tr);
            }

            $('.btn-modal-next')
                .attr('tab-id', id)
                .attr('data-next-tab', next)
                .attr('data-next-indicator', next)
                .attr('data-is-break', isBreak)
                .attr('data-steps', steps)
                .attr('data-modal-print', print);

            $('#modalRecap').modal();

        }
        else
        {
            tabContent.removeClass('active show');
            nextStepIndicator.addClass('active');
            nextTabContent.addClass('active show');
            isBreak ? displayButtons("add", id, next, steps, print) : displayButtons("add", -1, next, steps, print);
        }
    });

    $(document).on('click', '.btn-modal-next', function () {
        if($(this).attr('data-submit')){
            alert('Submitting ...');
        }
        else{
            let nextStepIndicator = $('span[data-order-step="' + $(this).attr('data-next-indicator') + '"]'),
                tabContent = $('#step' + $(this).attr('tab-id')),
                nextTabContent = $('#step' + $(this).attr('data-next-tab')),
                isBreak = $(this).attr('data-is-break'),
                steps = $(this).attr('data-steps'),
                print = $(this).attr('data-modal-print');

            tabContent.removeClass('active show');
            nextStepIndicator.addClass('active');
            nextTabContent.addClass('active show');
            isBreak ? displayButtons("add", $(this).attr('tab-id'), $(this).attr('data-next-tab'), steps, print) : displayButtons("add", -1, $(this).attr('data-next-tab'), steps, print);
        }
    });

    $(document).on('click', '.btn-prev', function () {

        let id = parseInt($(this).data('id')), prev, steps = $(this).data('steps'), breakPage, print = false;
        prev = id - 1;

        breakPage = $(this).attr('data-break-from').split(',');

        if(parseInt(breakPage[breakPage.length - 1]) !== -1){
            prev = parseInt(breakPage[breakPage.length - 1]);
            for(let i = id; i >= prev; i--){
                $('span[data-order-step="' + i + '"]').removeClass('active');
            }
        }

        let stepIndicator = $('span[data-order-step="' + id + '"]'),
            tabContent = $('#step' + id),
            prevTabContent = $('#step' + prev);

        if(prevTabContent.attr('data-print').toString() === "true"){
            print = true;
        }

        stepIndicator.removeClass('active');
        tabContent.removeClass('active show');
        prevTabContent.addClass('active show');

        breakPage.pop();
        breakPage = breakPage.join(',');
        displayButtons("remove", breakPage, prev, steps, print);
    });

    $(document).on('click', 'input[type="checkbox"]', function(){
        if(!$(this).attr('checked')){
            $(this).attr('checked', 'checked');
        }
        else{
            $(this).removeAttr('checked');
        }
    });

    $(document).on('click', 'input[type="radio"]', function(){
        if(!$(this).attr('checked')){
            $(this).attr('checked', 'checked');
        }
        else{
            $(this).removeAttr('checked');
        }
    });

    $(document).on('click', '.btn-addAreaField', function () {

        let ident = $(this).attr('data-id'), order = parseInt($(this).attr('data-order')), index, block, field,
            lastItem = $('.area-multiple').find('[data-multiple="'+ ident +'"][data-order="'+ order +'"][data-order-block="'+$(this).attr('data-order-block')+'"]'),
            nextItem = lastItem[0].outerHTML,
            removeBtn = '<button type="button" class="btn btn-outline-danger btn-removeAreaField" data-id="' + ident + '" data-order="2">' +
                '<i class="fa fa-minus-circle"></i></button>';

        index = lastItem.attr('data-index');
        block = lastItem.attr('data-block');
        field = lastItem.attr('data-field');

        lastItem.after(nextItem);
        nextItem = lastItem.next();
        nextItem.attr('data-order', order + 1);


        nextItem.attr('data-multiple', index + block + field + (order + 1));
        $(this).attr('data-id', index + block + field + (order + 1));
        $(this).attr('data-order', order + 1);

        nextItem.find('input[type="checkbox"]').attr("data-index-content", order + 1);
        nextItem.find('div[class*="extra-content"]').attr("data-index-content", order + 1);
        if(order + 1 > 1)
        {
            if(!$(this).next().hasClass('btn-removeAreaField'))
            {
                $(this).after(removeBtn);
                $(this).next().attr('data-order', order + 1);
                $(this).next().attr('data-order-block', $(this).attr('data-order-block'));
                $(this).next().attr('data-id', index + block + field + (order + 1));
            }
            else
            {
                $(this).next().attr('data-order', order + 1);
                $(this).next().attr('data-id', index + block + field + (order + 1));
            }
        }


        let fields = nextItem.find('[data-index-field="'+ field +'"]'), id, label;
        for(let i = 0; i < fields.length; i++){
            id = $(fields[i]).attr('name').substr(0,$(fields[i]).attr('name').length - 2), label = nextItem.find('label[for="'+ $(fields[i]).attr('id') +'"]');
            $(fields[i]).attr('id', id + (order + 1));
            $(label).attr('for',  $(fields[i]).attr('id'));
        }

    });

    $(document).on('click', '.btn-removeAreaField', function () {

        let ident = $(this).attr('data-id'), order = parseInt($(this).attr('data-order')), index, block , field,
            lastItem = $('.area-multiple').find('[data-multiple="'+ ident +'"][data-order="'+ order +'"][data-order-block="'+$(this).attr('data-order-block')+'"]');

        index = lastItem.attr('data-index');
        block = lastItem.attr('data-block');
        field = lastItem.attr('data-field');

        lastItem.remove();
        $(this).attr('data-order', order -1);
        $(this).prev().attr('data-order', order - 1);
        $(this).prev().attr('data-id', index + block + field + (order - 1));
        $(this).attr('data-id', index + block + field + (order - 1));

        if(order - 1 === 1)
        {
           $(this).remove();
        }

    });

    $(document).on('click', '.btn-addField', function () {
        let
            maxFields = parseInt($(this).attr('data-max-fields')),
            ident = $(this).attr('data-id'),
            order = parseInt($(this).attr('data-order')),
            lastItem = $('div[data-multiple="' + ident + '"][data-order="' + order + '"]'),
            removeButton,
            index, block, indexField, orderBlock,
            labels,
            nextItem = lastItem[0].outerHTML,
            isfileUpload;

        if ($(this).data('child') === true) {
            lastItem.after(nextItem);
            nextItem = lastItem.next();
            nextItem.attr('data-order', order + 1);



            let nextInput = nextItem.find('[data-index-field][data-index]') , nextLabel, id;
            index = nextInput.attr('data-index');
            indexField = nextInput.attr('data-index-field');

            id = nextInput.attr('id');
            nextLabel = nextItem.find('label[for="'+id+'"]');
            id = id.substr(0, id.length - (index +''+ indexField +''+ order).length)

            nextInput.attr('id', id + index + indexField + (order + 1));
            nextLabel.attr('for', id + index + indexField + (order + 1));

            nextItem.find('.btn-addField').attr('data-order', order + 1);

            nextItem.find('[data-btn-type="upload-document"]').attr('data-order', order + 1);
            nextItem.find('input[type="text"][data-custom]').attr('data-order', order + 1);
            nextItem.find('input[type="text"][data-custom]').next().attr('data-order', order + 1);

            if(maxFields === order + 1){
                nextItem.find('.btn-addField').remove();
            }

            if( order + 1 > 1 )
            {
                removeButton = '<button type="button" class="btn btn-outline-danger btn-removeField" data-max-fields="' + maxFields + '" data-child="true"  data-id="'+ident+ '" data-order="'+(parseInt(order) + 1)+'"><i class="fa fa-minus-circle"></i> </button>';
                nextItem.find('.btn-group').children('.btn-removeField').remove();
                nextItem.find('.btn-group').append(removeButton);
            }

            lastItem.find('.btn-removeField').remove();
            $(this).remove();
        }
        else {

            index = lastItem.attr('data-index');
            block = lastItem.attr('data-block');
            orderBlock = lastItem.attr('data-order-block');

            $('.block-buttons[data-index="'+index+'"]').show();
            if (order + 1 > 1) {
                removeButton = '<button type="button" class="btn btn-outline-danger btn-removeField" ' +
                    'data-max-fields="'+maxFields+'" data-child="false" ' +
                    'data-id="' + index + block + (order + 1) + '" ' +
                    'data-order="' + (order + 1) + '"><i class="fa fa-minus-circle"></i> </button>';

                if(!($(this).next().hasClass('btn-removeField'))){
                    $(this).after(removeButton);
                }else
                {
                    $(this).next().attr('data-order', order+1);
                    $(this).next().attr('data-id', index + block + (order + 1));
                }
            }

            $(this).attr('data-order', order + 1);
            $(this).attr('data-id', index + block + (order + 1));
            lastItem.after(nextItem);
            nextItem = lastItem.next();
            nextItem.attr('data-order', order + 1);
            nextItem.attr('data-order-block', order + 1);

            nextItem.attr('data-multiple', index + block + (order + 1));
            lastItem.removeClass('active show');
            $('.block-buttons[data-index="'+index+'"]').find('button').attr('data-order', order + 1);
            $('.block-buttons[data-index="'+index+'"]').find('button').attr('data-id', index + block + (order + 1));

            if(maxFields === order + 1){
                $(this).remove();
            }

            let areaDiv = nextItem.find('.area-multiple').find('div[data-multiple][data-order="1"]'), extraCheckBox;
            nextItem.find('.area-multiple').find('div[data-multiple][data-order!="1"]').remove();
            areaDiv.attr('data-order-block', order + 1);
            areaDiv.attr('data-order', 1);
            nextItem.find('.area-multiple').find('.btn-addAreaField').attr('data-order-block', order + 1);
            nextItem.find('.area-multiple').find('.btn-addAreaField').attr('data-order', 1);
            nextItem.find('.area-multiple').find('.btn-addAreaField').attr('data-id', index + block + areaDiv.attr('data-field') + 1);
            nextItem.find('.area-multiple').find('.btn-removeAreaField').remove();
            nextItem.find('.extra-content').attr('data-order', order + 1);
            nextItem.find('.extra-content').css('display', 'none');

            extraCheckBox = lastItem.find('input[type="checkbox"][data-extra-content][data-index="'+index+'"][data-order="'+order+'"]');

            if(extraCheckBox.length > 0 && extraCheckBox.attr('checked'))
            {
                nextItem.closest('form').find('button[class*="btn-download"][data-id="'+index+'"][data-order="'+order+'"]').attr('disabled', 'disabled');
                nextItem.closest('form').find('button[class*="btn-download"][data-id="'+index+'"][data-order="'+order+'"]').attr('data-disabled', true);
            }



            let extra = nextItem.find('.extra-content');
            if(extra.length > 0){
                $('form').find('.btn-download').attr('data-order', order + 1);
            }

            if(isfileUpload = nextItem.find('.div-upload-img')){
                isfileUpload.empty();
                nextItem.find('.controls').css('display', 'none');
                nextItem.find('.cropped-area').css('display', 'none');
            }

            let fields =  nextItem.find('select[data-index="'+index+'"][data-index-block="'+block+'"][data-order="'+order+'"],input[type!="checkbox"][data-index="'+index+'"][data-index-block="'+block+'"][data-order="'+order+'"]') ;
            let checkboxFields = nextItem.find('input[type="checkbox"][data-index="'+index+'"][data-index-block="'+block+'"][data-order="'+order+'"]') ;

            var i;
            for ( i = 0; i < fields.length; i++){
                let label = nextItem.find('label[for="' + $(fields[i]).attr('id') + '"]'), id = $(fields[i]).attr('name').substr(0,$(fields[i]).attr('name').length - 2);
                $(fields[i]).attr('id',  id + (order + 1));
                $(fields[i]).attr('data-order', (order + 1));
                $(label).attr('for',  $(fields[i]).attr('id'));
                $(label).removeAttr('data-select');
            }

            for ( i = 0; i < checkboxFields.length; i++){
                let label = nextItem.find('label[for="' + $(checkboxFields[i]).attr('id') + '"]'), id = $(checkboxFields[i]).attr('name').substr(0,$(checkboxFields[i]).attr('name').length - 2);
                $(checkboxFields[i]).attr('id',  id + (order + 1));
                $(checkboxFields[i]).attr('data-order', (order + 1));
                $(checkboxFields[i]).removeAttr('checked');
                $(label).attr('for',  $(checkboxFields[i]).attr('id'));
            }

            labels = nextItem.find('label');
            for ( i = 0; i < fields.length; i++){
                if($(labels[i]).attr('data-select')){
                    $(labels[i]).removeAttr('data-select');
                }
            }

            if(lastItem.attr('data-secondary-title')){
                nextItem.find('.block-title').text(lastItem.attr('data-secondary-title'));
                nextItem.find('.block-title').html(lastItem.attr('data-secondary-title') + ' <badge class="badge badge-pill badge-secondary" data-block="'+ (order + 1) +'"> '+ order +' </badge>');
            }
            else
            {
                nextItem.find('.block-title').find('badge').text(order + 1);
            }

            nextItem.find('input[type="tel"]').intlTelInput({
                initialCountry: "fr",
                geoIpLookup: function(success, failure) {
                    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                        var countryCode = (resp && resp.country) ? resp.country : "";
                        success(countryCode);
                    });
                },
                utilsScript: 'utils.js'
            });

            if(nextItem.find('input[type="tel"]').attr('placeholder')){
                var mask1 = nextItem.find('input[type="tel"]').attr('placeholder').replace(/[0-9]/g, 0);
                nextItem.find('input[type="tel"]').mask(mask1);
            }
        }

    });

    $(document).on('click', '.btn-removeField', function () {

        let ident = $(this).attr('data-id'),
            index,
            order = parseInt($(this).attr('data-order')),
            lastItem = $('div[data-multiple="' + ident + '"][data-order="' + order + '"]'),
            removeButton,
            block,
            maxFields = parseInt($(this).attr('data-max-fields')),
            addButton = '<button type="button" class="btn btn-outline-success btn-addField" data-max-fields="'+maxFields+'" data-child="true" data-id="' + ident + '" data-order="' + (order - 1) + '"><i class="fa fa-plus-circle"></i> </button>',
            prevItem = lastItem.prev();


        if ($(this).data('child') === true) {
            prevItem.find('.btn-group').append(addButton);
            if (order - 1 > 1) {
                removeButton = '<button type="button" class="btn btn-outline-danger btn-removeField" data-child="true" data-id="' + ident + '" data-order="' + (order - 1) + '"><i class="fa fa-minus-circle"></i> </button>';
                prevItem.find('.btn-group').append(removeButton);
            }
            lastItem.remove();
        }
        else{
            let ciblings = $(lastItem).siblings();
            for(let i = 0; i  < ciblings.length; i++){
                if($(ciblings[i]).hasClass('active show')){
                    $(ciblings[i]).removeClass('active show');
                }
            }

            prevItem.addClass('active show');
            index = lastItem.attr('data-index');
            block = lastItem.attr('data-block');

            if(!$(this).prev().hasClass('btn-addField')){
                $(this).before(addButton);
            }

            $(this).prev().attr('data-child', false);
            $(this).prev().attr('data-order', order - 1);
            $(this).prev().attr('data-id', index + block + (order - 1));

            $('.block-buttons').find('button').attr('data-id', index + block + (order - 1));

            lastItem.remove();





            $(this).attr('data-order', order - 1);
            $(this).attr('data-id', index + block + (order - 1));
            if (order - 1 === 1) {
                $(this).remove();
                $('.block-buttons').hide();
            }

            let extra = prevItem.find('.extra-content');
            if(extra.length > 0){
                $('form').find('.btn-download').attr('data-order', order - 1);
            }


            let extraCheckBox = prevItem.find('input[type="checkbox"][data-extra-content][data-index="'+index+'"][data-order="'+(order - 1)+'"]');

            if(extraCheckBox.length > 0 && !(extraCheckBox.attr('checked')))
            {
                let btnDownload = prevItem.closest('form').find('button[class*="btn-download"][data-id="'+index+'"][data-order="'+(order - 1)+'"]');
                if(btnDownload.length > 0)
                {
                    btnDownload.removeAttr('disabled');
                    btnDownload.attr('data-disabled', false);
                    btnDownload.addClass('btn-download-toggleable').hide();
                }
            }
            else if(extraCheckBox.attr('checked'))
            {
                let btnDownload = prevItem.closest('form').find('button[class*="btn-download"][data-id="'+index+'"][data-order="'+(order - 1)+'"]');
                if(btnDownload.length > 0)
                {
                    btnDownload.removeAttr('disabled');
                    btnDownload.attr('data-disabled', false);
                }
            }
        }
    });

    $(document).on('click', '.btn-next-block', function () {

        let current = $('div[data-multiple="' + $(this).attr('data-id') + '"][data-order="'+ $(this).attr('data-order') +'"]'),
            index = current.attr('data-index'), block = current.attr('data-block'),
            order = parseInt(current.attr('data-order')),
            next = $('div[data-multiple="' + index + block + (order + 1) + '"]');


        if(next[0])
        {
            current.removeClass('active show');
            next.addClass('active show');
            $(this).prev().attr('data-id', index + block + (order + 1));
            $(this).attr('data-id', index + block + (order + 1));
            $(this).attr('data-order', (order + 1));
            $(this).prev().attr('data-order', (order + 1));

            let extra = next.find('.extra-content'), btnDownload, checkExtra;
            if(extra.length > 0){
                btnDownload = $('form').find('.btn-download');
                if(btnDownload.length > 0)
                {
                    btnDownload.attr('data-order', order + 1)
                }

                checkExtra = next.find('input[type="checkbox"][data-extra-content][data-index="'+index+'"][data-order="'+(order + 1)+'"]');
                if(checkExtra.length > 0)
                {
                    if(checkExtra.attr('checked'))
                    {
                        btnDownload.removeAttr('disabled');
                        btnDownload.attr('data-disabled', false);
                    }
                    else
                    {
                        btnDownload.attr('disabled', 'disabled');
                        btnDownload.attr('data-disabled', true);
                    }
                }
            }
        }
    });

    $(document).on('click', '.btn-prev-block', function () {

        let current = $('div[data-multiple="' + $(this).attr('data-id') + '"][data-order="'+ $(this).attr('data-order') +'"]'),
            index = current.attr('data-index'), block = current.attr('data-block'), order = parseInt(current.attr('data-order')),
            prev = $('div[data-multiple="' + index + block + (order - 1) + '"]');

        if(prev[0])
        {
            current.removeClass('active show');
            prev.addClass('active show');
            $(this).attr('data-id', index + block + (order - 1));
            $(this).attr('data-order', (order - 1));
            $(this).next().attr('data-id', index + block + (order - 1));
            $(this).next().attr('data-order', (order - 1));


            let extra = prev.find('.extra-content'), btnDownload, checkExtra;
            if(extra.length > 0){
                btnDownload = $('form').find('.btn-download');
                if(btnDownload.length > 0)
                {
                    btnDownload.attr('data-order', order - 1)
                }

                checkExtra = prev.find('input[type="checkbox"][data-extra-content][data-index="'+index+'"][data-order="'+(order - 1)+'"]');
                if(checkExtra.length > 0)
                {
                    if(checkExtra.attr('checked'))
                    {
                        btnDownload.removeAttr('disabled');
                        btnDownload.attr('data-disabled', false);
                    }
                    else
                    {
                        btnDownload.attr('disabled', 'disabled');
                        btnDownload.attr('data-disabled', true);
                    }
                }
            }
        }
    });

    $(document).on('focus', 'input[data-target="date"]', function () {
        if($(this).attr('data-min-date'))
        {
            $(this).datepicker({
                autoclose: true,
                language: "fr",
                startDate: 'now'
            });
        }
        else
        {
            $(this).datepicker({
                autoclose: true,
                language: "fr"
            });
        }

        let self = $(this), value;
        $(this).mask('00/00/0000', {
            placeholder: 'JJ/MM/AAAA',
            onComplete: function(cep) {
                value = cep;
                self.attr('data-valid-mask', true);
            },
            onChange: function(cep){
                cep !== value ? self.attr('data-valid-mask', false) : self.attr('data-valid-mask', true);
            },
            onInvalid: function(val, e, f, invalid, options){
                self.attr('data-valid-mask', false);
            }
        });
    });

    $(document).on('blur', 'input[data-target="date"]', function () {
        let self = $(this);
        self.attr('data-valid-mask', true);
        if(!self.attr('data-valid-mask') || self.attr('data-valid-mask') === 'false'){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }
    });

    $(document).on('focus', 'input[data-target="time"]', function () {
        $(this).timepicker({
            showMeridian: false,
            icons: {
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down'
            }
        });

        let self = $(this), value;
        $(this).mask('00:00', {
            placeholder: '--:--',
            onComplete: function(cep) {
                value = cep;
                self.attr('data-valid-mask', true);
            },
            onChange: function(cep){
                cep !== value ? self.attr('data-valid-mask', false) : self.attr('data-valid-mask', true);
            },
            onInvalid: function(val, e, f, invalid, options){
                self.attr('data-valid-mask', false);
            }
        });
    });

    $(document).on('blur', 'input[data-target="time"]', function () {
        let self = $(this);
        self.attr('data-valid-mask', true)
        if(!self.attr('data-valid-mask') || self.attr('data-valid-mask') === 'false'){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }
    });

    $(document).on('click', 'button[data-btn-type="upload"]', function () {
        let div = $(this).closest('div[data-multiple]');
        div.find('input[type="file"][data-type="image"]').trigger('click');
    });

    $(document).on('change', 'input[type="file"][data-type="image"]', function () {
        let divArea = $(this).closest('div[data-multiple]').find('.div-upload-img');
        readURL(this, divArea);
    });

    $(document).on('click', 'button[data-btn-type="upload-document"]', function () {
       let id = $(this).data('id');
       $('input[type="file"][data-id="' + id + '"][data-order="'+$(this).attr('data-order')+'"]').trigger('click');
    });

    $(document).on('click', 'input[data-custom]', function () {
        let id = $(this).data('custom');
        $('input[type="file"][data-id="' + id + '"][data-order="'+$(this).attr('data-order')+'"]').trigger('click');
    });

    $(document).on('change', 'input[type="file"][data-type="document"]', function () {
        let id = $(this).data('id');
        $('input[data-custom="' + id + '"][data-order="'+$(this).attr('data-order')+'"]').val($(this).val().substr($(this).val().lastIndexOf('\\') + 1, $(this).val().length));
    });

    function readURL(input, divArea) {
        var reader, cropper, $imgElement, $image;
        $imgElement = "<img src='targetSrc' class='img-form' crossorigin>";

        let aspectRatio = divArea.attr('data-width') === divArea.attr('data-height') ? 1 : 16 / 9;

        if (input.files && input.files[0]) {
            reader = new FileReader();
            reader.onload = function(e) {
                divArea.html($imgElement);
                divArea.find('img').attr('src', e.target.result);
                $image = divArea.find('img');
                $image.cropper({
                    viewMode: 1,
                    aspectRatio: aspectRatio,
                    //minCropBoxWidth: parseInt(divArea.attr('data-width')),
                    //minCropBoxHeight: parseInt(divArea.attr('data-height')),
                    ready: function () {

                        let croppedImage = $image.cropper('getCroppedCanvas',{
                            width: 100,
                            height: 100
                        });

                        divArea.closest('.upload-container').find('.cropped-area').html(croppedImage);
                        divArea.closest('.upload-container').find('.cropped-area').css('display', 'flex');
                        divArea.closest('.upload-container').find('.controls').show();
                    }
                });
                cropper = $image.data('cropper');
                $image.on('cropmove', function(){
                    let croppedImage = cropper.getCroppedCanvas({
                        width: 100,
                        height: 100
                    });
                    divArea.closest('.upload-container').find('.cropped-area').html(croppedImage);
                });
            }
            reader.readAsDataURL(input.files[0]);
        }

        divArea.siblings('.controls').find('.btn-move').on('click', function(){
            cropper.setDragMode('move');
        });

        divArea.siblings('.controls').find('.btn-valid').on('click', function(){

            var imageData = cropper.getCroppedCanvas({
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            }).toDataURL();
            var image = '<img class="img-thumbnail" src="'+ imageData +'" />'

            $('#modalPhotoPreview').find('.modal-body').html(image);
            $('#modalPhotoPreview').modal();

            /*cropper.getCroppedCanvas({
               minWidth: parseInt(divArea.attr('data-width')),
               minHeight: parseInt(divArea.attr('data-height')),
               maxWidth: 4096,
               maxHeight: 4096,
               fillColor: '#fff',
               imageSmoothingEnabled: false,
               imageSmoothingQuality: 'high',
           }).toBlob((blob) => {
               console.log(blob);
           });*/

            /*
            cropper.getCroppedCanvas().toBlob((blob) => {
              const formData = new FormData();

              formData.append('croppedImage', blob);

              // Use `jQuery.ajax` method
              $.ajax('/path/to/upload', {
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success() {
                  console.log('Upload success');
                },
                error() {
                  console.log('Upload error');
                },
              });
            });
           */
        });

        divArea.siblings('.controls').find('.btn-refresh').on('click', function(){
            cropper.reset();
        });

        divArea.siblings('.controls').find('.btn-zoom-in').on('click', function(){
            cropper.zoom(0.1);
        });

        divArea.siblings('.controls').find('.btn-zoom-out').on('click', function(){
            cropper.zoom(-0.1);
        });

        divArea.siblings('.controls').find('.btn-scale-x').on('click', function(){
            cropper.scale(-1, 1);
        });

        divArea.siblings('.controls').find('.btn-scale-y').on('click', function(){
            cropper.scale(1, -1);
        });

        divArea.siblings('.controls').find('.btn-rotate-left').on('click', function(){
            cropper.rotate(-45);
        });

        divArea.siblings('.controls').find('.btn-rotate-right').on('click', function(){
            cropper.rotate(45);
        });
    }

    $(document).on('focus', 'input[name*="rpps"]', function () {
        let self = $(this), value;
        $(this).mask('00000000000', {
            placeholder: '12345678911',
            onComplete: function(cep) {
                value = cep;
                self.attr('data-valid-mask', true);
            },
            onChange: function(cep){
                cep !== value ? self.attr('data-valid-mask', false) : self.attr('data-valid-mask', true);
            },
            onInvalid: function(val, e, f, invalid, options){
                self.attr('data-valid-mask', false);
            }
        });
    });

    $(document).on('blur', 'input[name*="rpps"]', function () {
        let self = $(this);
        if(!self.attr('data-valid-mask') || self.attr('data-valid-mask') === 'false'){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }
    });

    $(document).on('focus', 'input[name*="zipCode"]', function () {
        let self = $(this), value;
        $(this).mask('00000', {
            placeholder: '12345',
            onComplete: function(cep) {
                value = cep;
                self.attr('data-valid-mask', true);
            },
            onChange: function(cep){
                cep !== value ? self.attr('data-valid-mask', false) : self.attr('data-valid-mask', true);
            },
            onInvalid: function(val, e, f, invalid, options){
                self.attr('data-valid-mask', false);
            }
        });
    });

    $(document).on('blur', 'input[name*="zipCode"]', function () {
        let self = $(this);
        if(!self.attr('data-valid-mask') || self.attr('data-valid-mask') === 'false'){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }
    });

    $(document).on('focus', 'input[name*="siren"]', function () {
        let self = $(this), value;
        $(this).mask('000 000 000', {
            placeholder: '123 456 789',
            onComplete: function(cep) {
                value = cep;
                self.attr('data-valid-mask', true);
            },
            onChange: function(cep){
                cep !== value ? self.attr('data-valid-mask', false) : self.attr('data-valid-mask', true);
            },
            onInvalid: function(val, e, f, invalid, options){
                self.attr('data-valid-mask', false);
            }
        });
    });

    $(document).on('blur', 'input[name*="siren"]', function () {
        let self = $(this);
        if(!self.attr('data-valid-mask') || self.attr('data-valid-mask') === 'false'){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }
    });

    $(document).on('focus', 'input[name*="iban"]', function () {
        let self = $(this), value;
        $(this).mask('SS00 0000 0000 0000 0000 0000 000', {
            placeholder: '____ ____ ____ ____ ____ ____ ___',
            onComplete: function(cep) {
                value = cep;
                self.attr('data-valid-mask', true);
            },
            onChange: function(cep){
                cep !== value ? self.attr('data-valid-mask', false) : self.attr('data-valid-mask', true);
            },
            onInvalid: function(val, e, f, invalid, options){
                self.attr('data-valid-mask', false);
            }
        });
    });

    $(document).on('blur', 'input[name*="iban"]', function () {
        let self = $(this);
        if(!self.attr('data-valid-mask') || self.attr('data-valid-mask') === 'false'){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }
    });

    $(document).on('focus', 'input[name*="bic"]', function () {
        let self = $(this), value;
        $(this).mask('SSSSSSSSSSS', {
            placeholder: '___________',
            onComplete: function(cep) {
                value = cep;
                self.attr('data-valid-mask', true);
            },
            onChange: function(cep){
                cep !== value ? self.attr('data-valid-mask', false) : self.attr('data-valid-mask', true);
            },
            onInvalid: function(val, e, f, invalid, options){
                self.attr('data-valid-mask', false);
            }
        });
    });

    $(document).on('blur', 'input[name*="bic"]', function () {
        let self = $(this);
        if(!self.attr('data-valid-mask') || self.attr('data-valid-mask') === 'false'){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }
    });

    $(document).on('blur', 'input[name*="mail"]', function () {
        let self = $(this);

        if(!checkEmail(self)){
            self.addClass('has-error');
            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
        }
        else{
            self.removeClass('has-error');
            $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
        }

    });

    $(document).on('blur', 'input[name*="raison"][data-exported="true"]', function () {
        let toRaison = $('input[name*="raison"][data-imported="true"]');
        toRaison.val($(this).val());
    });

    $(document).on('blur', 'input[name*="address"][data-exported="true"]', function () {
        let toAddress = $('input[name*="address"][data-imported="true"]');
        toAddress.val($(this).val());
    });

    $(document).on('blur', 'select[name*="city"][data-exported="true"]', function () {
        let toCity = $('select[name*="city"][data-imported="true"]');
        let selectedOption = $(this).find('option:selected');
        toCity.find('option[value="'+selectedOption.val()+'"]').attr('selected', 'selected');
    });

    $(document).on('keyup', 'input[name^="zipCode"]', function () {

        let index = $(this).attr('data-index'), order = $(this).attr('data-order'), self = $(this),
            city = $('select[name^="city"][data-index="'+index+'"][data-order="'+order+'"]'),
            toZipCode, toCity;
            city.empty();
            city.append('<option value="">-- Choisir --</option>');

            if($.trim(self.val()) !== "")
            {
                $.ajax({
                    url: 'https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port&postcode=' + self.val(),
                    success: function (result) {
                        if(result.features.length > 0){
                            if(self.attr('data-exported')){
                                toZipCode = $('input[name^="zipCode"][data-imported="true"]');
                                toCity = $('select[name^="city"][data-imported="true"]');

                                toCity.empty();
                                toCity.append('<option value="">-- Choisir --</option>');
                                toZipCode.val(self.val());

                                for(let i = 0; i < result.features.length; i++){
                                    let info = result.features[i].properties;
                                    let options = city.find('option[value="'+ info.city +'"]');

                                    if(options.length === 0)
                                    {
                                        city.append('<option value="'+ info.city +'">' + info.city + '</option>');
                                        toCity.append('<option value="'+ info.city +'">' + info.city + '</option>');
                                    }
                                }

                                if(city.find('option[value!=""]').length === 1){
                                    city.find('option[value!=""]').attr('selected', 'selected');
                                    toCity.find('option[value!=""]').attr('selected', 'selected');
                                }
                                else
                                {
                                    city.find('option[value=""]').attr('selected', 'selected');
                                    toCity.find('option[value=""]').attr('selected', 'selected');
                                }

                                self.removeClass('has-error');
                                $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
                            }
                            else
                            {
                                for(let i = 0; i < result.features.length; i++){
                                    let info = result.features[i].properties;
                                    let options = city.find('option[value="'+ info.city +'"]');

                                    if(options.length === 0)
                                    {
                                        city.append('<option value="'+ info.city +'">' + info.city + '</option>');
                                    }
                                }

                                if(city.find('option[value!=""]').length === 1){
                                    city.find('option[value!=""]').attr('selected', 'selected');
                                }
                                else
                                {
                                    city.find('option[value=""]').attr('selected', 'selected');
                                }

                                self.removeClass('has-error');
                                $('label[for="'+self.attr('id')+'"]').removeClass('label-error');
                            }
                        }
                        else{
                            self.addClass('has-error');
                            $('label[for="'+self.attr('id')+'"]').addClass('label-error');
                        }
                    }
                })
            }
    });

    $(document).on('click', 'input[type="checkbox"][data-extra-content]', function () {
       let id = $(this).attr('data-id'),
           order = $(this).attr('data-order'),
           extraContentDiv  = $('div.extra-content[data-id="'+id+'"][data-order="'+ order +'"]'), downloadBtn, extraFields;

        if($(this).closest('.area-multiple').length > 0)
        {
            let indexContent = $(this).attr('data-index-content');
            extraContentDiv = $(this).closest('.area-multiple').find('div[data-index-content="'+indexContent+'"][class*="extra-content"][data-order="'+ order +'"]');
        }
        else
        {
            let civility = $('select[data-push-extra][data-order="'+order+'"]').find('option:selected').text(),
                firstName = $('input[data-push-extra][name*="firstName"][data-order="'+order+'"]'),
                lastName = $('input[data-push-extra][name*="lastName"][data-order="'+order+'"]');

            extraContentDiv.find('[data-pull-extra="true"][data-order="'+order+'"]')
                .val(civility + ' ' + $(firstName).val().substr(0,1).toUpperCase() + $(firstName).val().substr(1, ($(firstName).val().length) - 1 ) + ' ' + $(lastName).val().toUpperCase());
        }

        downloadBtn = $('button[class*="btn-download"][data-id="'+$(this).attr('data-index')+'"]');

        if(downloadBtn.length > 0){
            if(downloadBtn.attr('data-disabled') && downloadBtn.attr('data-disabled').toString() === "true")
            {
                downloadBtn.removeAttr('disabled');
                downloadBtn.attr('data-disabled', false);
            }
            else if(downloadBtn.attr('data-disabled') && downloadBtn.attr('data-disabled').toString() === "false")
            {
                downloadBtn.attr('disabled', 'disabled');
                downloadBtn.attr('data-disabled', true);
               // downloadBtn.slideToggle();
            }
            else if(!downloadBtn.hasClass('btn-download-toggleable'))
            {
                downloadBtn.addClass('btn-download-toggleable');
            }
            else {
                downloadBtn.slideToggle();
            }

            extraFields = extraContentDiv.find('input');
            if($(this).is(':checked'))
            {
                for(let k = 0; k < extraFields.length; k++){
                    $(extraFields[k]).attr('required', '');
                }
                downloadBtn.removeAttr('disabled');
            }
            else
            {
                for(let k = 0; k < extraFields.length; k++){
                    $(extraFields[k]).removeAttr('required');
                }
            }
        }
        extraContentDiv.slideToggle();

    });

    $(document).on('keyup', 'input[data-push-extra][name*="firstName"]', function () {
        let order = $(this).attr('data-order');

        let civility = $('select[data-push-extra][data-order="'+order+'"]').find('option:selected').text(),
            firstName = $(this).val(),
            lastName = $('input[data-push-extra][name*="lastName"][data-order="'+order+'"]').val();

        $('[data-pull-extra="true"][data-order="'+order+'"]').val(civility + ' ' + firstName.substr(0,1).toUpperCase() + firstName.substr(1, (firstName.length) - 1 ) + ' ' + lastName.toUpperCase())
    });

    $(document).on('keyup', 'input[data-push-extra][name*="lastName"]', function () {
        let order = $(this).attr('data-order');

        let civility = $('select[data-push-extra][data-order="'+order+'"]').find('option:selected').text(),
            lastName = $(this).val(),
            firstName = $('input[data-push-extra][name*="firstName"][data-order="'+order+'"]').val();

        $('[data-pull-extra="true"][data-order="'+order+'"]').val(civility + ' ' + firstName.substr(0,1).toUpperCase() + firstName.substr(1, (firstName.length) - 1 ) + ' ' + lastName.toUpperCase())

    });

    $(document).on('countrychange', 'input[type="tel"]', function () {
        if($(this).attr('placeholder')){
            var mask1 = $(this).attr('placeholder').replace(/[0-9]/g, 0);
            $(this).mask(mask1);
        }
    })

    $(document).on('blur', 'input[type="tel"]', function () {
        if($.trim($(this).val()) === ''){
            $(this).addClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').addClass('label-error');
        }

        if ($(this).intlTelInput("isValidNumber")) {
            $(this).removeClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-error');
        } else {
            $(this).addClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').addClass('label-error');
        }
    })

    $(document).on('keyup', 'input[type="password"]', function (e) {
        let pass = $(this).val(),i,
            totalSize = 6,
            currentSize,
            lowerChars = 'abcdefghijklmnopqrstuvwxyz', upperChars = lowerChars.toUpperCase(),
            specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
            numbers = '0123456789',
            minus = 0,
            majus = 0,
            specials = 0,
            nums = 0;

        for( i = 0; i < pass.length; i++){
            if(lowerChars.indexOf(pass[i]) !== -1){
                minus++;
            }
            else if(upperChars.indexOf(pass[i]) !== -1)
            {
                majus++;
            }
            else if(specialChars.indexOf(pass[i]) !== -1)
            {
                specials++;
            }
            else if(numbers.indexOf(pass[i]) !== -1)
            {
                nums++;
            }
        }

        currentSize = minus + majus + specials + nums;

        if(currentSize.length < totalSize || (majus === 0 || specials === 0 || nums === 0)){

            $(this).addClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').addClass('label-error');

            $(this).removeClass('has-warning');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-warning');

            let message = $(this).closest('.form-group').find('small[class*="font-weight-bold"]');
            message.text('Mauvais');
            message.removeClass('text-success');
            message.removeClass('text-warning');
            message.addClass('text-danger');
        }
        else if(currentSize === totalSize){

            $(this).removeClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-error');

            $(this).addClass('has-warning');
            $('label[for="'+$(this).attr('id')+'"]').addClass('label-warning');

            let message = $(this).closest('.form-group').find('small[class*="font-weight-bold"]');
            message.text('Moyen');

            message.removeClass('text-danger');
            message.removeClass('text-success');
            message.addClass('text-warning');
        }
        else if(currentSize > totalSize ){

            $(this).removeClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-error');
            $(this).removeClass('has-warning');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-warning');

            let message = $(this).closest('.form-group').find('small[class*="font-weight-bold"]');
            message.text('Fort');
            message.removeClass('text-danger');
            message.removeClass('text-warning');
            message.addClass('text-success');
        }
    });

    $(document).on('keyup', 'input[type="text"][data-target="password"]', function (e) {
        let pass = $(this).val(),i,
            totalSize = 6,
            currentSize,
            lowerChars = 'abcdefghijklmnopqrstuvwxyz', upperChars = lowerChars.toUpperCase(),
            specialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
            numbers = '0123456789',
            minus = 0,
            majus = 0,
            specials = 0,
            nums = 0;

        for( i = 0; i < pass.length; i++){
            if(lowerChars.indexOf(pass[i]) !== -1){
                minus++;
            }
            else if(upperChars.indexOf(pass[i]) !== -1)
            {
                majus++;
            }
            else if(specialChars.indexOf(pass[i]) !== -1)
            {
                specials++;
            }
            else if(numbers.indexOf(pass[i]) !== -1)
            {
                nums++;
            }
        }

        currentSize = minus + majus + specials + nums;

        if(currentSize.length < totalSize || (majus === 0 || specials === 0 || nums === 0)){

            $(this).addClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').addClass('label-error');
            let message = $(this).closest('.form-group').find('small[class*="font-weight-bold"]');
            message.text('Mauvais');

            message.removeClass('text-success');
            message.removeClass('text-warning');
            message.addClass('text-danger');
        }
        else if(currentSize === totalSize){

            $(this).removeClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-error');

            $(this).addClass('has-warning');
            $('label[for="'+$(this).attr('id')+'"]').addClass('label-warning');

            let message = $(this).closest('.form-group').find('small[class*="font-weight-bold"]');
            message.text('Moyen');

            message.removeClass('text-danger');
            message.removeClass('text-success');
            message.addClass('text-warning');
        }
        else if(currentSize > totalSize ){

            $(this).removeClass('has-error');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-error');
            $(this).removeClass('has-warning');
            $('label[for="'+$(this).attr('id')+'"]').removeClass('label-warning');

            let message = $(this).closest('.form-group').find('small[class*="font-weight-bold"]');
            message.text('Fort');
            message.removeClass('text-danger');
            message.removeClass('text-warning');
            message.addClass('text-success');
        }
    });

    $(document).on('click', '.btn-download', function () {

        let index = $(this).attr('data-id'), raison, address, zipCode, city, iban, bic, fields, el = '<div id="pdf-container"><div class="pdf-header"><table><tr><td>', checkExtra, reference,
            date, day, month, year, hour, minutes, currentDate, fileName;

            raison = $('input[data-index="'+ index +'"][name^="raison"][data-order="'+$(this).attr('data-order')+'"]');
            address = $('input[data-index="'+ index +'"][name^="address"][data-order="'+$(this).attr('data-order')+'"]');
            zipCode = $('input[data-index="'+ index +'"][name^="zipCode"][data-order="'+$(this).attr('data-order')+'"]');
            city = $('select[data-index="'+ index +'"][name^="city"][data-order="'+$(this).attr('data-order')+'"]');
            iban = $('input[data-index="'+ index +'"][name^="iban"][data-order="'+$(this).attr('data-order')+'"]');
            bic = $('input[data-index="'+ index +'"][name^="bic"][data-order="'+$(this).attr('data-order')+'"]');

            date= new Date();
            day = date.getDate();
            day = day > 9 ? day : '0' + day;
            month = date.getMonth();
            month = month > 9 ? month : '0' + month;
            year = date.getFullYear();
            hour = date.getHours();
            hour = hour > 9 ? hour : '0' + hour;
            minutes = date.getMinutes();
            minutes = minutes > 9 ? minutes : '0' + minutes;
            currentDate = day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;


            checkExtra = $('input[type="checkbox"][data-extra-content="true"][data-index="'+ index +'"][data-order="'+$(this).attr('data-order')+'"]');

            if(checkExtra.length > 0){
                reference = $('form').attr('data-rumm') + ' - ' + raison.val();
            }
            else {
                reference =  $('form').attr('data-rumm');
            }

            fields = [raison, address, zipCode, city, iban, bic];

            if(!validate(fields)){
                alert('Veuillez renseigner les champs obligatoires');
                return 0;
            }

            fields.shift();
            fields.shift();
            if(!checkValidity(fields)){
                alert('Veuillez vérifier les champs renseignés');
                return 0;
            }

            el += currentDate + '</td><td><p class="pager"></p></td></tr></table>' +
                '            <table border="1">' +
                '                <tr>' +
                '                    <td>' +
                '                        <h5>' +
                '                            MANDAT de Prélèvement SEPA' +
                '                        </h5>' +
                '                        <h6>' +
                '                            Référence du mandat : ' + reference +
                '                        </h6>' +
                '                    </td>' +
                '                    <td>' +
                '                        <h6>' +
                '                            Créancier : SAS ALAXIONE' +
                '                        </h6>' +
                '                    </td>' +
                '                </tr>' +
                '            </table>' +
                '            <div>' +
                '                <p class="pdf-help-block">' +
                '                    En signant ce formulaire de mandat, vous autorisez SAS ALAXIONE à envoyer des instructions à votre banque pour débiter votre compte, et BANQUE\n' +
                'CIC SUD OUEST votre banque à débiter votre compte conformément aux instructions de SAS ALAXIONE.\n' +
                'Vous bénéficiez du droit d’être remboursé par votre banque selon les conditions décrites dans la convention que vous avez passée avec elle. Une\n' +
                'demande de remboursement doit être présentée dans les 8 semaines suivant la date de débit de votre compte pour un prélèvement autorisé.' +
                '                </p>' +
                '            </div>' +
                '        </div>' +
                '        <div class="pdf-body">' +
                '            <table>' +
                '                <tr>' +
                '                    <th>' +
                '                        Votre nom :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>' + raison.val() +'</p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr>' +
                '                    <th>' +
                '                        Votre adresse :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>' +
                address.val() +
                '                        </p>' +
                '                        <p>' +
                zipCode.val() + '-' + city.val() +
                '                        </p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr>' +
                '                    <th>' +
                '                        Votre pays :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>France</p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr class="pdf-client-info">' +
                '                    <th>' +
                '                        Les coordonnées de votre compte :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>' +
                iban.val() +
                '                        </p>' +
                '                        <p>' +
                bic.val() +
                '                        </p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr>' +
                '                    <th>' +
                '                        Nom du créancier :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>SAS ALAXIONE</p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr>' +
                '                    <th>' +
                '                        Identifiant du créancier :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>' +
                '                            FR63ZZZ674869' +
                '                        </p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr>' +
                '                    <th>' +
                '                        Adresse du créancier :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>' +
                '                            69 RUE DU ROUET' +
                '                        </p>' +
                '                        <p>' +
                '                            13008 MARSEILLE' +
                '                        </p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr>' +
                '                    <th>' +
                '                        Pays du créancier :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>FR</p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr>' +
                '                    <th>' +
                '                        Type de paiement :' +
                '                    </th>' +
                '                    <td><ul class="payment-types">' +
                '                          <li><span class="active">Paiement récurrent / répétitif</span></li>' +
                '                          <li><span>Paiement ponctuel</span></li>' +
                '                    </ul></td>' +
                '                </tr>' +
                '                <tr class="pdf-client-info">' +
                '                    <th>' +
                '                        Signé à :' +
                '                    </th>' +
                '                    <td>' +
                '                        <p>.........................................................................................</p>' +
                '                    </td>' +
                '                </tr>' +
                '                <tr class="doc-sign">' +
                '                    <th colspan="2">' +
                '                        Signature(s) :' +
                '                    </th>' +
                '                </tr>' +
                '            </table>' +
                '            <p class="pdf-help-block">' +
                '                Vos droits concernant le présent mandat sont expliqués dans un document que vous pouvez obtenir auprès de votre banque.' +
                '            </p>' +
                '        </div>' +
                '    </div>';


        fileName = day + '' + month + '' + year + '_Bon_Sepa_' + raison.val().replace(/ /g, "_") + '.pdf';

        let options = { // my selector
            margin:       0.5,
            filename:     fileName,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: {orientation: 'portrait', unit: 'in', format: 'a4'},
        };

        html2pdf(el, options).toPdf().get('pdf').then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });

        /*html2pdf().set(options).from(el).toPdf().get('pdf').then(function (pdf) {
            window.open(pdf.output('bloburl'), '_blank');
        });*/

    });
    // Submit the form
    $(document).on('click', '.btn-submit-form', function (e) {
        let id = parseInt($(this).data('id')),
        tabContent = $('#step' + id);

        if(tabContent.attr('data-resume') === 'true'){
            e.preventDefault();
            let
                tr = '<tr>', th, td, done, fields,
                tabBlocks = tabContent.find('.block-tabs').find('.tab-pane'),
                labels = $(tabBlocks[0]).find('label[data-select="true"]');
            $('#tabRecap #theadRecap tr').empty();
            $('#tabRecap #tbodyRecap').empty();

            for(let i = 0; i< labels.length; i++){
                th = '<th>' + $(labels[i]).text() + '</th>';
                $('#tabRecap #theadRecap tr').append(th);
            }

            for(let i = 0; i< tabBlocks.length; i++){
                tr = '<tr>';
                fields = $(tabBlocks[i]).find('input[data-select="true"][type!="checkbox"], textarea[data-select="true"], select[data-select="true"]');
                labels = $(tabBlocks[i]).find('label[data-select="true"]');
                done = false;

                for(let j = 0; j< fields.length; j++){
                    td = '<td>' + $(fields[j]).val() + '</td>';
                    tr += td;
                }
                tr += '</tr>';
                $('#tabRecap #tbodyRecap').append(tr);
            }


            $('.btn-modal-next')
                .attr('data-submit', true);
            $('#modalRecap').modal();

        }
        else
        {
            alert('submitting ...');
        }

    });

});

function  checkValidity(fields) {
    let nbErrors = 0;
    for(let j = 0; j < fields.length; j++){
        if($(fields[j]).attr('data-valid-mask') === 'false'){
            nbErrors++;
            $(fields[j]).addClass('has-error');
            $('label[for="'+ $(fields[j]).attr('id') +'"').addClass('label-error');
        }
        else
        {
            $(fields[j]).removeClass('has-error');
            $('label[for="'+ $(fields[j]).attr('id') +'"').removeClass('label-error');
        }
    }

    if(nbErrors > 0){
        if ($('form').find('div[class*="alert-danger"]').length === 0) {
            let errorDiv = '<div class="alert alert-danger">Champs invalides</div>';
            $('form').prepend(errorDiv);
        }
    }
    else
    {
        if ($('form').find('div[class*="alert-danger"]').length > 0) {
            $('form').find('div[class*="alert-danger"]').remove();
        }
    }

    return nbErrors === 0;
}

function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email[0].value);
}

function validate(fields) {

    let errors = 0;
    for (let i = 0; i < fields.length; i++) {

        if ($(fields[i]).is('select')){
            if ($(fields[i]).attr('required') && $.trim($(fields[i]).find('option:selected').val()) === "") {
                $(fields[i]).addClass('has-error');
                $('label[for="' + $(fields[i]).attr('id') + '"]').addClass('label-error');
                errors++;
            }
            else {
                $(fields[i]).removeClass('has-error');
                $('label[for="' + $(fields[i]).attr('id') + '"]').removeClass('label-error');
            }
        }
        else{
            if ($(fields[i]).attr('required') && $.trim($(fields[i]).val()) === "") {
                $(fields[i]).addClass('has-error');
                $('label[for="' + $(fields[i]).attr('id') + '"]').addClass('label-error');
                errors++;
            }
            else {
                $(fields[i]).removeClass('has-error');
                $('label[for="' + $(fields[i]).attr('id') + '"]').removeClass('label-error');
            }
        }
    }

    if (errors > 0) {
        if ($('form').find('div[class*="alert-danger"]').length === 0) {
            let errorDiv = '<div class="alert alert-danger">Veuillez remplir les champs obligatoires</div>';
            $('form').prepend(errorDiv);
        }
    }
    else {
        if ($('form').find('div[class*="alert-danger"]').length > 0) {
            $('form').find('div[class*="alert-danger"]').remove();
        }
    }

    return errors === 0;
}

function displayButtons(action, breakPoints , step, length, print) {
    let formButtons, breaksFrom;

    if(action === "add")
    {
        if(($('button[data-break-from]')[0]) !== undefined)
        {
            breaksFrom = $('button[data-break-from]')[0];
            breaksFrom = $(breaksFrom).attr('data-break-from');
            breaksFrom += ',' + breakPoints;
        }
        else
        {
            breaksFrom = breakPoints;
        }
    }
    else
    {
        breaksFrom = breakPoints;
    }


    if (step < length - 1) {
        formButtons = '<div class="row">';

        if (step > 0) {
            formButtons += '<div class="form-group col-sm-6">' +
                '          <button type="button" data-break-from="'+ breaksFrom +'" data-id="' + step + '" data-steps="' + length + '" class="btn btn-outline-secondary btn-prev"><i class="fa fa-chevron-circle-left"></i> Précedent</button>' +
                '      </div><div class="form-group col-sm-6 text-right">';
        }
        else {
            formButtons += '<div class="form-group col-sm-12 text-right">';
        }

        if(print.toString() === "true")
        {
            let checkedBox = $('input[type="checkbox"][data-extra-content][data-index="'+step+'"]');
            if(checkedBox.length > 0)
            {
                if(checkedBox.attr('checked'))
                {
                    formButtons += '<button type="button" data-id="' + step + '" data-order="'+checkedBox.attr('data-order')+'" class="btn btn-outline-primary btn-download">' +
                        'Imprimer le mandat SEPA <i class="fa fa-file-pdf-o"></i>' +
                        '</button>';
                }
                else
                {
                    formButtons += '<button type="button" data-id="' + step + '" data-order="'+checkedBox.attr('data-order')+'" class="btn btn-outline-primary btn-download btn-download-toggleable">' +
                        'Imprimer le mandat SEPA <i class="fa fa-file-pdf-o"></i>' +
                        '</button>';
                }
            }

        }

        formButtons += ' <button type="button" data-id="' + step + '" data-steps="' + length + '" class="btn btn-outline-success btn-next">Suivant <i class="fa fa-chevron-circle-right"></i></button>' +
            '           </div>' +
            '     </div>';

    }
    else {
        formButtons = '<div class="row">' +
            '     <div class="form-group col-sm-6">' +
            '          <button type="button" data-break-from="'+ breaksFrom +'" data-id="' + step + '" data-steps="' + length + '" class="btn btn-outline-secondary btn-prev"><i class="fa fa-chevron-circle-left"></i> Précedent</button>' +
            '      </div>' +
            '      <div class="form-group col-sm-6 text-right">' ;

        if(print.toString() === "true")
        {
            formButtons += '<button type="button" data-id="' + step + '" data-order="1" class="btn btn-outline-primary btn-download btn-download-toggleable">Imprimer le mandat SEPA <i class="fa fa-file-pdf-o"></i></button>';
        }

        formButtons += '          <button class="btn btn-success btn-submit-form" data-id="'+ step +'">Envoyer</button>' +
            '      </div>' +
            '     </div>'
    }
    $('.form-buttons').html(formButtons);
}

