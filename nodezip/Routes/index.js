

const express = require('express');
const router = express.Router()
var cors = require('cors')
router.use(cors())
router.use('/login', require('./login'))

router.use('/signup/', require('./signup'))
router.use('/addquestion/', require('./addquestion'))

router.use('/addanswer/', require('./addanswer'))

router.use('/editanswer/', require('./editanswer'))
router.use('/deleteanswer/', require('./deleteanswer'))
router.use('/verifyanswer/', require('./verifyanswer'))
router.use('/editupvotes/', require('./editupvotes'))
router.use('/editdownvotes/', require('./editdownvotes'))
router.use('/deletequestion/', require('./deletequestion'))
router.use('/deleteansweradmin/', require('./deleteansweradmin'))

router.use('/editupvotesquestion/', require('./editupvotesques'))
router.use('/editdownvotesquestion/', require('./editdownvotesques'))
router.use('/viewqa/', require('./viewqa'))
router.use('/viewownquestion/', require('./viewownquestion'))
router.use('/viewownanswer/', require('./viewownanswer'))
router.use('/viewquestionbytag/', require('./viewquestionbytag'))
router.use('/createcommunity/', require('./createcommunity'))
router.use('/follow/', require('./follow'))
router.use('/acceptreq/', require('./acceptreq'))
router.use('/addprofile/', require('./addprofile'))

router.use('/removemember/', require('./removemember'))
router.use('/viewcommunity/', require('./viewcommunity'))//list of community
router.use('/uploadpic/', require('./uploadpic'))
router.use('/searchquest/', require('./viewques'))//regex 

router.use('/acceptanswer/', require('./accept'))
router.use('/viewuser/', require('./viewuser'))//list of all users
router.use('/uploadfile/', require('./files'))

router.use('/viewprofile/', require('./viewprofile'))//own profile
router.use('/viewotherprofile/', require('./viewotherprofile'))//by name
router.use('/viewprofilecommunity/', require('./viewprofilecommunity'))//search by name

router.use('/searchcommunity/', require('./searchcommunity'))
router.use('/viewquestion/', require('./viewquestion'))//mostviewed and latest
router.use('/userquestion/', require('./userquestion'))
router.use('/communitydp/', require('./communitydp'))

router.use('/useranswer/', require('./useranswer'))
router.use('/viewalltag/', require('./viewalltag'))
router.use('/viewtag/', require('./viewtag'))
router.use('/sharedwithme',require('./sharedwithme'))

router.use('/sharequestion',require('./share'))

router.use('/communityquestion/', require('./communityquestion'))
router.use('/adminquestion/', require('./adminquestion'))
router.use('/ownupvotesquestion/', require('./ownupvotesquestion'))
router.use('/ownupvotesanswer/', require('./ownupvotesanswer'))

router.use('/notification/', require('./notification'))

router.use('/communityanswer/', require('./communityanswer'))
router.use('/adminview/', require('./adminview'))
router.use('/viewanswersadmin/', require('./viewanswersadmin'))
router.use('/deletequestiongrp/', require('./deletequestiongrp'))


module.exports = router    