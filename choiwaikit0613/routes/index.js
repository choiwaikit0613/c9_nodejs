var express = require('express');
var router = express.Router();
var $ = require("jquery");
var request = require("request");
var _ = require("underscore");

//////////////////////////////////////////////////
// Index
//////////////////////////////////////////////////
// Index - START
router.get('/', function(req, res, next) {
    res.render('index/default.jade', { title: 'choiwaikit0613' });
});

// Index - END
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Pokeadvisor
//////////////////////////////////////////////////
// Pokeadvisor - START
// router.get('/pokeadvisor/', function(req, res, next){
//     res.locals.project = 'pokeadvisor';
//     res.render('pokeadvisor/default.jade');
// });

router.get('/pokeadvisor/:group?', function(req, res, next){
    res.locals.project = 'pokeadvisor';
    if(req.params.group == 'abc11hk'){
        res.locals.admin = 'abc11hk';
    }
    res.render('pokeadvisor/default.jade');
});

// API for getting group data
router.use('/api/pokeadvisor/group/:group?/', function(req, res, next){
    var profileList_family_listname = 'kamtin';
    var profileList_family_listdata = [
        {
            'id': 'choiwaikit0613',
            'name': 'Kit'
        },
        {
            'id': 'Haaaylie',
            'name': 'Yan'
        },
        {
            'id': 'SCI2011',
            'name': 'Ivy Siu'
        },
        {
            'id': 'chu0v0chu',
            'name': 'Julie'
        },
        
    ];
    
    var profileList_tkd_listname = 'tkdyl';
    var profileList_tkd_listdata = [
        {
            'id': 'choiwaikit0613',
            'name': 'Kit'
        },
        {
            'id': 'SarahSiu',
            'name': 'Sarah Siu'
        },
        {
            'id': 'JeithK',
            'name': '徐灝勤'
        },
        {
            'id': 'Chung0w0',
            'name': '鄧景聰'
        },
    ];
    
    var profileList_bwys_listname = 'bwys';
    var profileList_bwys_listdata = [
        {
            'id': 'choiwaikit0613',
            'name': 'Kit'
        },
        {
            'id': 'DOZLI',
            'name': '李健聰'
        },
        {
            'id': 'OSWALDST',
            'name': '李成德'
        },
        {
            'id': 'JosephYHY',
            'name': '楊學又'
        },
        {
            'id': 'OpKelvin98',
            'name': 'Kelvin Op (藍)'
        },
        {
            'id': 'KelvinOp98',
            'name': 'Kelvin Op (紅)'
        },
    ];
    
    var profileList_cityucs_listname = 'cityucs';
    var profileList_cityucs_listdata = [
        {
            'id': 'choiwaikit0613',
            'name': 'Kit'
        },
        {
            'id': 'jasonycw1992',
            'name': 'Jason Yu'
        },
        {
            'id': 'applelok113',
            'name': 'Apple Ng'
        },
    ];
    
    var profileList_ascnsa_listname = 'ascnsa';
    var profileList_ascnsa_listdata = [
        {
            'id': 'choiwaikit0613',
            'name': 'Kit'
        },
        {
            'id': '404Benny',
            'name': 'Benny'
        },
        {
            'id': 'Bubemonster',
            'name': 'Winky Hui'
        },
        {
            'id': 'RHui',
            'name': 'Ricky Hui'
        },
        {
            'id': 'Sindy1015',
            'name': 'Sindy'
        },
    ];
    
    var profileList_cp_listname = 'cp';
    var profileList_cp_listdata = [
        {
            'id': 'choiwaikit0613',
            'name': 'Kit'
        },
        {
            'id': 'GarkiMalus',
            'name': 'Alex'
        }
    ];
    
    var group = req.params.group;
    var profileLists = {};
    addProfileList(profileList_family_listname, profileList_family_listdata);
    addProfileList(profileList_tkd_listname, profileList_tkd_listdata);
    addProfileList(profileList_bwys_listname, profileList_bwys_listdata);
    addProfileList(profileList_cityucs_listname, profileList_cityucs_listdata);
    addProfileList(profileList_ascnsa_listname, profileList_ascnsa_listdata);
    addProfileList(profileList_cp_listname, profileList_cp_listdata);
    
    function addProfileList(listName, listData){
        var profileList = listData;
        profileList[ 'listname' ] = listName;
        profileLists[ listName ] = profileList;
    }
    
    var result = {};
    if(group){
        if(group == 'abc11hk'){
            result = profileLists;
        }
        else{
            var profileList = {};
            var profileListTemp = profileLists[group];
            profileListTemp[ 'listname' ] = group;
            profileList[ group ] = profileListTemp;
            
            result = profileList;
        }
    }
    else{
        // disable to protect player list
        // result = profileLists;
    }
    res.json(result);
});

// API for getting player data
router.use('/api/pokeadvisor/id/:id', function(req, res, next){
    var id = req.params.id;
    getProfile(id);
    function getProfile(id){
        var url = 'https://pokeadvisor.com/SearchTrainer?q='+id;
        request(url, function (error, response, body) {
            // console.log('response.statusCode : ', response.statusCode );
            if (!error && response.statusCode == 200) {
                res.json(body);
            }
        });
    }
});

// Pokeadvisor - END
//////////////////////////////////////////////////


module.exports = router;