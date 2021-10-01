/* Preloaded sounds as Howls for use in the main script event handlers */

// Ambient Howl
const ambient = new Howl({
    src: "resources/sounds/sizzle.mp3",
    autoplay: true,
    loop: true,
    volume : 0.1
    
});

const action =  new Howl({
    src: "resources/sounds/clicking.wav", 
    volume: 0.5
});


// Collection of Howls grouped by the context in which they are to be played
const successHowls = [
    new Howl({
        src: "resources/sounds/its_actually_quite_nice.mp3",
        volume : 0.5
    }),
    new Howl({
        src: "resources/sounds/perfectly_cooked_in_the_middle.mp3",
        volume : 0.5
    }),
    new Howl({
        src: "resources/sounds/Bloody_Delicious.mp3",
        volume : 0.5
    }),
    new Howl({
        src: "resources/sounds/Phenomenal.mp3",
        volume : 0.5
    }),
    new Howl({
        src: "resources/sounds/Spot_on.mp3",
        volume : 0.5
    }),
    new Howl({
        src: "resources/sounds/Tender.mp3",
        volume : 0.5
    }),
    new Howl({
        src: "resources/sounds/SeriouslyWellDone.mp3",
        volume : 1.0
    }),
    new Howl({
        src: "resources/sounds/ThetemperatureIsSpotOn.mp3",
        volume : 1.0
    }),
    new Howl({
        src: "resources/sounds/GreatEffort.mp3",
        volume : 1.0
    })
];

// Failure howls
const failureHowls = [
    new Howl({
        src: "resources/sounds/waterphone.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/disaster.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/hey-bozo.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/its-ridiculous.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/plonker-twat.mp3", 
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/wooh.mp3",
        volume : 0.5
    }),
    new Howl({
        src: "resources/sounds/you-need-therapy.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/can-someone-stop-this-guy.mp3", 
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/crap-on-top-of-crap-on-top-of-crap-on-top-of-crap.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/absolutely-pathetic.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/get-out.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/hes-in-denial.mp3",
        volume : 0.1
    }),
    new Howl({
        src: "resources/sounds/oh-my-god.mp3",
        volume : 0.5
    })
];

/* Returns a random howl from the collection specified as a string parameter "success" or "failure"*/
function getRandomHowl(type){
    var howls = successHowls;

    if(type == "success" || type == "Success"){
        var howls = successHowls;
    } else if(type == "failure" || type == "Failure"){
        var howls = failureHowls;
    } else {
        return {};
    }

    var randomIndex = Math.floor(Math.random() * howls.length);
    return howls[randomIndex];
}