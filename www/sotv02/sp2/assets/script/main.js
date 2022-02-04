$(document).ready(function () {
    const obj = {
        'ad': 'Andorra',
        'ae': 'United Arab Emirates',
        'af': 'Afghanistan',
        'ag': 'Antigua and Barbuda',
        'ai': 'Anguilla',
        'al': 'Albania',
        'am': 'Armenia',
        'ao': 'Angola',
        'aq': 'Antarctica',
        'ar': 'Argentina',
        'as': 'American Samoa',
        'at': 'Austria',
        'au': 'Australia',
        'aw': 'Aruba',
        'ax': 'Åland Islands',
        'az': 'Azerbaijan',
        'ba': 'Bosnia and Herzegovina',
        'bb': 'Barbados',
        'bd': 'Bangladesh',
        'be': 'Belgium',
        'bf': 'Burkina Faso',
        'bg': 'Bulgaria',
        'bh': 'Bahrain',
        'bi': 'Burundi',
        'bj': 'Benin',
        'bl': 'Saint Barthélemy',
        'bm': 'Bermuda',
        'bn': 'Brunei',
        'bo': 'Bolivia',
        'bq': 'Caribbean Netherlands',
        'br': 'Brazil',
        'bs': 'Bahamas',
        'bt': 'Bhutan',
        'bv': 'Bouvet Island',
        'bw': 'Botswana',
        'by': 'Belarus',
        'bz': 'Belize',
        'ca': 'Canada',
        'cc': 'Cocos (Keeling) Islands',
        'cd': 'Democratic Republic of the Congo',
        'cf': 'Central African Republic',
        'cg': 'Republic of the Congo',
        'ci': 'Côte dIvoire',
        'ck': 'Cook Islands',
        'cl': 'Chile',
        'cm': 'Cameroon',
        'cn': 'China',
        'co': 'Colombia',
        'cr': 'Costa Rica',
        'cu': 'Cuba',
        'cv': 'Cape Verde',
        'cw': 'Curaçao',
        'cx': 'Christmas Island',
        'cy': 'Cyprus',
        'cz': 'Czechia',
        'de': 'Germany',
        'dj': 'Djibouti',
        'dk': 'Denmark',
        'dm': 'Dominica',
        'do': 'Dominican Republic',
        'dz': 'Algeria',
        'ec': 'Ecuador',
        'ee': 'Estonia',
        'eg': 'Egypt',
        'eh': 'Western Sahara',
        'er': 'Eritrea',
        'es': 'Spain',
        'et': 'Ethiopia',
        'fi': 'Finland',
        'fj': 'Fiji',
        'fk': 'Falkland Islands',
        'fm': 'Federated States of Micronesia',
        'fo': 'Faroe Islands',
        'fr': 'France',
        'ga': 'Gabon',
        'gb': 'United Kingdom',
        'gb-nir': 'Northern Ireland',
        'gb-eng': 'England',
        'gb-sct': 'Scotland',
        'gb-wls': 'Wales',
        'gd': 'Grenada',
        'ge': 'Georgia',
        'gf': 'French Guiana',
        'gg': 'Guernsey',
        'gh': 'Ghana',
        'gi': 'Gibraltar',
        'gl': 'Greenland',
        'gm': 'Gambia',
        'gn': 'Guinea',
        'gp': 'Guadeloupe',
        'gq': 'Equatorial Guinea',
        'gr': 'Greece',
        'gs': 'S. Georgia & S. Sandwich Islands',
        'gt': 'Guatemala',
        'gu': 'Guam',
        'gw': 'Guinea-Bissau',
        'gy': 'Republic of Guyana',
        'hk': 'Hong Kong',
        'hm': 'Heard Island and McDonald Islands',
        'hn': 'Honduras',
        'hr': 'Croatia',
        'ht': 'Haiti',
        'hu': 'Hungary',
        'ch': 'Switzerland',
        'id': 'Indonesia',
        'ie': 'Ireland',
        'il': 'Israel',
        'im': 'Isle of Man',
        'in': 'India',
        'io': 'British Indian Ocean Territory',
        'iq': 'Iraq',
        'ir': 'Republic of Iran',
        'is': 'Iceland',
        'it': 'Italy',
        'je': 'Jersey',
        'jm': 'Jamaica',
        'jo': 'Jordan',
        'jp': 'Japan',
        'ke': 'Kenya',
        'kg': 'Kyrgyzstan',
        'kh': 'Cambodia',
        'ki': 'Kiribati',
        'km': 'Comoros',
        'kn': 'Saint Kitts and Nevis',
        'kp': 'North Korea',
        'kr': 'South Korea',
        'kw': 'Kuwait',
        'ky': 'Cayman Islands',
        'kz': 'Kazakhstan',
        'la': 'Laos',
        'lb': 'Lebanon',
        'lc': 'Saint Lucia',
        'li': 'Liechtenstein',
        'lk': 'Sri Lanka',
        'lr': 'Liberia',
        'ls': 'Lesotho',
        'lt': 'Lithuania',
        'lu': 'Luxembourg',
        'lv': 'Latvia',
        'ly': 'Libya',
        'ma': 'Morocco',
        'mc': 'Monaco',
        'md': 'Moldova',
        'me': 'Montenegro',
        'mf': 'Saint Martin',
        'mg': 'Madagascar',
        'mh': 'Marshall Islands',
        'mk': 'Macedonia',
        'ml': 'Mali',
        'mm': 'Myanmar',
        'mn': 'Mongolia',
        'mo': 'Macao',
        'mp': 'Northern Mariana Islands',
        'mq': 'Martinique',
        'mr': 'Mauritania',
        'ms': 'Montserrat',
        'mt': 'Malta',
        'mu': 'Mauritius',
        'mv': 'Maldives',
        'mw': 'Malawi',
        'mx': 'Mexico',
        'my': 'Malaysia',
        'mz': 'Mozambique',
        'na': 'Namibia',
        'nc': 'New Caledonia',
        'ne': 'Niger',
        'nf': 'Norfolk Island',
        'ng': 'Nigeria',
        'ni': 'Nicaragua',
        'nl': 'Netherlands',
        'no': 'Norway',
        'np': 'Nepal',
        'nr': 'Nauru',
        'nu': 'Niue',
        'nz': 'New Zealand',
        'om': 'Oman',
        'pa': 'Panama',
        'pe': 'Peru',
        'pf': 'French Polynesia',
        'pg': 'Papua New Guinea',
        'ph': 'Philippines',
        'pk': 'Pakistan',
        'pl': 'Poland',
        'pm': 'Saint Pierre and Miquelon',
        'pn': 'Pitcairn Islands',
        'pr': 'Puerto Rico',
        'ps': 'State of Palestine',
        'pt': 'Portugal',
        'pw': 'Palau',
        'py': 'Paraguay',
        'qa': 'Qatar',
        're': 'Réunion',
        'ro': 'Romania',
        'rs': 'Serbia',
        'ru': 'Russia',
        'rw': 'Rwanda',
        'sa': 'Saudi Arabia',
        'sb': 'Solomon Islands',
        'sc': 'Seychelles',
        'sd': 'Sudan',
        'se': 'Sweden',
        'sg': 'Singapore',
        'sh': 'Saint Helena',
        'si': 'Slovenia',
        'sj': 'Svalbard and Jan Mayen',
        'sk': 'Slovakia',
        'sl': 'Sierra Leone',
        'sm': 'San Marino',
        'sn': 'Senegal',
        'so': 'Somalia',
        'sr': 'Suriname',
        'ss': 'South Sudan',
        'st': 'Sao Tome and Principe',
        'sv': 'El Salvador',
        'sx': 'Sint Maarten',
        'sy': 'Syria',
        'sz': 'Eswatini',
        'tc': 'Turks and Caicos Islands',
        'td': 'Chad',
        'tf': 'French Southern Territories',
        'tg': 'Togo',
        'th': 'Thailand',
        'tj': 'Tajikistan',
        'tk': 'Tokelau',
        'tl': 'East Timor',
        'tm': 'Turkmenistan',
        'tn': 'Tunisia',
        'to': 'Tonga',
        'tr': 'Turkey',
        'tt': 'Trinidad and Tobago',
        'tv': 'Tuvalu',
        'tw': 'Taiwan',
        'tz': 'Tanzania',
        'ua': 'Ukraine',
        'ug': 'Uganda',
        'um': 'United States Minor Outlying Islands',
        'us': 'United States',
        'uy': 'Uruguay',
        'uz': 'Uzbekistan',
        'va': 'Vatican City',
        'vc': 'Saint Vincent and the Grenadines',
        've': 'Venezuela',
        'vg': 'British Virgin Islands',
        'vi': 'Virgin Islands',
        'vn': 'Vietnam',
        'vu': 'Vanuatu',
        'wf': 'Wallis and Futuna',
        'ws': 'Samoa',
        'xk': 'Kosovo',
        'ye': 'Yemen',
        'yt': 'Mayotte',
        'za': 'South Africa',
        'zm': 'Zambia',
        'zw': 'Zimbabwe'
    };

    let countryArr = []; // array for the contry options
    const keys = Object.keys(obj); // object keys
    let prop = keys[Math.floor(Math.random() * keys.length)]; // random object property
    let isCorrect; // variable that determines if the country was guessed correctly
    let loadImg;
    const wrapper = $('#options'); // event listener for all the buttons
    let index; // index of a correct answer in the array

    let score = 0;
    let health = 3;
    let storagedHighscore = localStorage.getItem('highscore');

    const startButton = $('#startButton');
    startButton.click(startGame);
    const tryAgainButton = $('#tryAgainButton');
    tryAgainButton.click(startGame);

    const startWindow = $('#startWindow');
    const layout = $('#layout');
    const gameOverWindow = $('#gameOverWindow');
    const flagImage = $('#flag-image');

    const highScore = $('#highScore');

    startWindow.css('display', 'block');
    layout.css('display', 'none');
    gameOverWindow.css('display', 'none');

    $('#score').html(score);
    highScore.html(localStorage.getItem('highscore'));

    function startGame() {
        gameOverWindow.css('display', 'none');
        startWindow.css('display', 'none');
        layout.css('display', 'flex');

        loadImage();
        loadAnswers();
        displayLifes();
    }

    function loadImage() {
        loadImg = flagImage.attr('src', `https://flagcdn.com/${prop}.svg`);
    };

    // load answers to the array and 
    function loadAnswers() {
        // for every value in object
        for (let i = 0; i < 5; i++) {
            let rndm = obj[keys[Math.floor(Math.random() * keys.length)]];
            // push the value to the array.
            countryArr.push(rndm);
        }
        // push the correct value to the array
        countryArr.push(obj[prop]);
        // shuffle the array
        countryArr.sort(() => Math.random() - 0.5);

        $(`#quiz-option-text-${0}`).html(countryArr[0]);
        $(`#quiz-option-text-${1}`).html(countryArr[1]);
        $(`#quiz-option-text-${2}`).html(countryArr[2]);
        $(`#quiz-option-text-${3}`).html(countryArr[3]);
        $(`#quiz-option-text-${4}`).html(countryArr[4]);
        $(`#quiz-option-text-${5}`).html(countryArr[5]);

        /*
        for (let i = 0; i <= 5; i++) {
            $(`#quiz-option-text-${i}`).html(countryArr[i]);
        };
        */

        //load score
        $('#score').html(score);
        setHighscore();
        highScore.html(localStorage.getItem('highscore'));
        // index of the correct answer in the array
        index = countryArr.indexOf(obj[prop]);
    };

    function displayLifes() {
        $('#heart-02').css('display', 'inline');
        $('#heart-01').css('display', 'inline');
        $('#heart-00').css('display', 'inline');
    }

    function lostLife() {
        health--;
        if (health === 2) {
            $('#heart-02').css('display', 'none');
        } else if (health === 1) {
            $('#heart-01').css('display', 'none');
        } else if (health === 0) {
            $('#heart-00').css('display', 'none');
        }

        if (health <= 0) {
            setTimeout(gameOver, 1000);
        }
    }

    function gameOver() {
        layout.css('display', 'none');
        gameOverWindow.css('display', 'block');
        $('#finalScore').html(score);
        resetStats();
    }

    function resetStats() {
        health = 3;
        score = 0;
    };

    wrapper.click((e) => {
        const isButton = e.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        } else {
            // if the obj value equals to the content of the button
            if (obj[prop] === e.target.querySelector('span').textContent) {
                console.log('true');
                isCorrect = true;
                e.target.style.backgroundColor = 'rgb(60, 139, 60)';
                score++;
                // reload game
                setTimeout(reloadGame, 500);

            } else {
                isCorrect = false;
                e.target.style.backgroundColor = 'rgb(241, 85, 85)';
                $(`#quiz-option-${index}`).css('background-color', 'rgb(60, 139, 60)');
                setTimeout(reloadGame, 1000);
                lostLife();
            }
            $('button')
            .prop('disabled', true);
        }
    });

    // reload the game options and the image
    function reloadGame() {
        
        $('button')
            .prop('disabled', false)
            .css('background-color', 'rgb(192, 192, 192)')
            .css('color', 'rgb(0,0,0)');
        isCorrect = false;
        countryArr = [];
        prop = keys[Math.floor(Math.random() * keys.length)];
        loadImage();
        loadAnswers();
        clearHint();

    };

    function setHighscore() {
        if (storagedHighscore !== null) {
            if (score > storagedHighscore) {
                localStorage.setItem('highscore', score);
            }
        }
        else {
            localStorage.setItem('highscore', 0);
        }
    }

    const showHintButton = $('#showHintButton');
    showHintButton.click(showHint);


    function showHint() {
        $.ajax({
            type: 'GET',
            url: 'https://restcountries.com/v2/alpha/' + prop,
            success: (data) => {
                const capital = data.capital;
                $('#showHintPlain').html(capital);
            }
        })
    }

    function clearHint() {
        $('#showHintPlain').html("");
    }

});


