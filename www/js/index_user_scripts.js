var db = new WebSqlDB(sucesso, erro);

function sucesso() {
    console.log("Sucesso DB");
}

function erro() {
    console.log("Erro de DB: " + error);
}

/*jshint browser:true */
/*global $ */
(function () {
    "use strict";
    /*
      hook up event handlers 
    */
    function register_event_handlers() {


        /* button  #btnmenu */
        $(document).on("click", "#btnmenu", function (evt) {
            /*global uib_sb */
            /* Other possible functions are: 
              uib_sb.open_sidebar($sb)
              uib_sb.close_sidebar($sb)
              uib_sb.toggle_sidebar($sb)
               uib_sb.close_all_sidebars()
             See js/sidebar.js for the full sidebar API */

            uib_sb.toggle_sidebar($("#sdmenu"));
            return false;
        });

        /* button  #btnvoltaraluno */
        $(document).on("click", "#btnvoltaraluno", function (evt) {
            $("#btnalunos").click();
            return false;
        });

        /* button  #btnsalvaraluno */
        $(document).on("click", "#btnsalvaraluno", function (evt) {
            var codalu = $("#txtcodaluno").val();
            if (codalu != "") {
                db.updateAluno(JSON.stringify({
                    "codalu": codalu,
                    "nomalu": $("#txtnomealuno").val(),
                    "nomcur": $("#txtnomecursoaluno").val(),
                    "fotalu": $("#imgaluno").attr('src')
                }), function (status) {
                    if (status == true) {
                        navigator.notification.alert(
                            "Aluno alterado com sucesso!"
                        );
                    }
                });
            } else {
                db.insertAluno(JSON.stringify({
                    "nomalu": $("#txtnomealuno").val(),
                    "nomcur": $("#txtnomecursoaluno").val(),
                    "fotalu": $("#imgaluno").attr('src')
                }), function (status) {
                    if (status == true) {
                        navigator.notification.alert(
                            "Aluno cadastrado com sucesso!"
                        );
                    }
                });
            }
            $("#txtcodaluno").val("");
            $("#imgaluno").attr("src", "images/Strabburg.jpg");
            $("#txtnomealuno").val("");
            $("#txtnomecursoaluno").val("");
            return false;
        });


        /* button  #btnsair */
        $(document).on("click", "#btnsair", function (evt) {
            navigator.notification.confirm("Deseja mesmo sair?",
                onSair,
                "TCCFreak",
                "Sim,Não");
            uib_sb.close_sidebar($("#sdmenu"));
            return false;
        });

        /* button  #btninformacoes */
        $(document).on("click", "#btninformacoes", function (evt) {
            /* your code goes here */
            return false;
        });

        /* button  #btntrabalhos */
        $(document).on("click", "#btntrabalhos", function (evt) {
            // lista dados dos trabalhos
            db.findTrabalhoAll(function (trabalhos) {
                // limpa a lista
                $("#lsttrabalhos").html("");
                for (var i = 0; i < trabalhos.length; i++) {
                    // adiciona os itens na lista
                    $("#lsttrabalhos").prepend(
                        '<ion-item id="' + trabalhos[i].codtra + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + trabalhos[i].codtra + '" class="button button-positive" onclick="editTrabalho(this.id)"><i class="icon icon ion-edit"></i>                    </button> ' +
                        ' <button id="' + trabalhos[i].codtra + '" name = "' + i + '" class="button button-assertive" onclick="deleteTrabalho(this.id)"><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        trabalhos[i].nomtra + ' - ' + trabalhos[i].nomcur + '</ion-item>'
                    );
                }

            });
            activate_subpage("#splistatrabalhos");
            uib_sb.close_sidebar($("#sdmenu"));
            return false;
        });

        /* button  #btnvoltartrabalho */
        $(document).on("click", "#btnvoltartrabalho", function (evt) {
            $("#btntrabalhos").click();
            return false;
        });

        /* button  #btnsalvartrabalho */
        $(document).on("click", "#btnsalvartrabalho", function (evt) {
            var codtra = $("#txtcodtrabalho").val();
            if (codtra != "") {
                db.updateTrabalho(JSON.stringify({
                    "codtra": codtra,
                    "nomtra": $("#txtnometrabalho").val(),
                    "nomcur": $("#txtnomecursotrabalho").val()
                }), function (status) {
                    if (status == true) {
                        navigator.notification.alert(
                            "Trabalho alterado com sucesso!"
                        );
                    }
                });
            } else {
                db.insertTrabalho(JSON.stringify({
                    "nomtra": $("#txtnometrabalho").val(),
                    "nomcur": $("#txtnomecursotrabalho").val()
                }), function (status) {
                    if (status == true) {
                        navigator.notification.alert(
                            "Trabalho cadastrado com sucesso!"
                        );
                    }
                });
            }
            $("#txtcodtrabalho").val("");
            $("#txtnometrabalho").val("");
            $("#txtnomecursotrabalho").val("");
            return false;
        });

        /* button  #btnalunos */
        $(document).on("click", "#btnalunos", function (evt) {
            // lista dados dos alunos
            db.findAlunoAll(function (alunos) {
                // limpa a lista
                $("#lstalunos").html("");
                for (var i = 0; i < alunos.length; i++) {
                    // adiciona os itens na lista
                    $("#lstalunos").prepend(
                        '<ion-item id="' + alunos[i].codalu + '" class="item widget uib_w_6 item-button-right" data-uib="ionic/list_item" data-ver="0"> ' +
                        '<div class="buttons"> ' +
                        ' <button id="' + alunos[i].codalu + '" class="button button-positive" onclick="editAluno(this.id)"><i class="icon icon ion-edit"></i>                    </button> ' +
                        ' <button id="' + alunos[i].codalu + '" name = "' + i + '" class="button button-assertive" onclick="deleteAluno(this.id)"><i class="icon icon ion-trash-b"></i> ' +
                        ' </button>' +
                        ' </div>' +
                        '<img src="' + alunos[i].fotalu + '" height="32" width="32"> ' +
                        alunos[i].nomalu + ' - ' + alunos[i].nomcur + '</ion-item>'
                    );
                }

            });
            activate_subpage("#splistaalunos");
            uib_sb.close_sidebar($("#sdmenu"));
            return false;
        });


        $(document).on("click", "#imgaluno", function (evt) {
            navigator.camera.getPicture(onSucessoFoto, onErroFoto, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                cameraDirection: Camera.Direction.FRONT
            });
        });

    }
    document.addEventListener("app.Ready", register_event_handlers, false);
})();

// callback de sair
function onSair(indiceBotao) {
    if (indiceBotao == 1) {
        console.log("Saindo");
        navigator.app.exitApp();
    }
}

// callback de sucesso da foto
function onSucessoFoto(foto) {
    // exibie a foto na tela
    $("#imgaluno").attr("src", "data:image/jpeg;base64," + foto);
}

// callback de erro da foto
function onErroFoto(erro) {
    alert("Erro na captura da foto: " + erro.code);
}

function addAluno() {
    activate_subpage("#spaluno");
    $("#txtcodaluno").val("");
    $("#imgaluno").attr("src", "images/Strabburg.jpg");
    $("#txtnomealuno").val("");
    $("#txtnomecursoaluno").val("");
}

function editAluno(codalu) {
    db.findAlunoById(codalu, function (aluno) {
        if (aluno != null) {
            activate_subpage("#spaluno");
            $("#txtcodaluno").val(aluno.codalu);
            $("#imgaluno").attr("src", aluno.fotalu);
            $("#txtnomealuno").val(aluno.nomalu);
            $("#txtnomecursoaluno").val(aluno.nomcur);
        }
    });
}

function deleteAluno(codalu) {
    navigator.notification.confirm("Confirma exclusão do aluno?",
        function (indiceBotao) {
            if (indiceBotao == 1) {
                db.deleteAluno(JSON.stringify({
                    "codalu": codalu
                }), function (status) {
                    if (status == true) {
                        // removendo elementos
                        var item = document.getElementById(codalu);
                        item.parentNode.removeChild(item);
                    }
                });
            }
        },
        "TCCFreak",
        "Sim,Não");
}

function addTrabalho() {
    activate_subpage("#sptrabalho");
    $("#txtcodtrabalho").val("");
    $("#txtnometrabalho").val("");
    $("#txtnomecursotrabalho").val("");
}

function editTrabalho(codtra) {
    db.findTrabalhoById(codtra, function (trabalho) {
        if (trabalho != null) {
            activate_subpage("#sptrabalho");
            $("#txtcodtrabalho").val(trabalho.codtra);
            $("#txtnometrabalho").val(trabalho.nomtra);
            $("#txtnomecursotrabalho").val(trabalho.nomcur);
        }
    });
}

function deleteTrabalho(codtra) {
    navigator.notification.confirm("Confirma exclusão do trabalho?",
        function (indiceBotao) {
            if (indiceBotao == 1) {
                db.deleteTrabalho(JSON.stringify({
                    "codtra": codtra
                }), function (status) {
                    if (status == true) {
                        // removendo elementos
                        var item = document.getElementById(codtra);
                        item.parentNode.removeChild(item);
                    }
                });
            }
        },
        "TCCFreak",
        "Sim,Não");
}