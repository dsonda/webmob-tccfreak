function uib_w_17_popup_controller($scope, $ionicPopup) {

    // A confirm dialog
    $scope.show = function () {
        uib_sb.close_sidebar($("#sdmenu"));
        var confirmPopup = $ionicPopup.confirm({
            title: 'TCCFreak',
            template:
                'App para registro de frequência das orientações de TCC.<br/>' +
                'Versão: 0.0.1<br/><br/>' +
                '<b>Criado por:</b><br/>' +
                'Daniel Sonda<br/>' +
                'dsonda@gmail.com<br/>' +
                '49 9904 7749<br/><br/>' +
                '<b>Dados do dispositivo:</b><br/>' +
                'Plataforma: ' + window.device.platform + '<br/>' +
                'Versão: ' + window.device.version + '<br/>' +
                'Modelo: ' + window.device.model + '<br/>' +
                'Nome: ' + window.device.name + '<br/>' +
                'Cordova: ' + window.device.cordova,
            buttons: [
                {
                    text: 'OK',
                    type: 'button-positive',
                    onTap: function (e) {
                        return $scope.close;
                    }
                }
            ]
        });
    };

}