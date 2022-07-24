'use strict';

var _ = require('underscore');

module.exports = function () {
    var l = [
        {
            id: 'serves_of_10_mLs',
            name: 'serves of 10 mLs'
        },
        {
            id: 'serves_of_100_mLs',
            name: 'serves of 100 mLs'
        },
        {
            id: 'serves_of_500_mLs',
            name: 'serves of 500 mLs'
        },
        {
            id: 'ants',
            name: 'ants'
        },
        {
            id: 'apples',
            name: 'apples'
        },
        {
            id: 'apricots',
            name: 'apricots'
        },
        {
            id: 'artichokes',
            name: 'artichokes'
        },
        {
            id: 'avocadoes',
            name: 'avocadoes'
        },
        {
            id: 'babacos',
            name: 'babacos'
        },
        {
            id: 'baby_beetroots',
            name: 'baby beetroots'
        },
        {
            id: 'baby_carrots',
            name: 'baby carrots'
        },
        {
            id: 'baby_corns',
            name: 'baby corns'
        },
        {
            id: 'baby_leaves',
            name: 'baby leaves'
        },
        {
            id: 'baby_octopuses',
            name: 'baby octopuses'
        },
        {
            id: 'babybels',
            name: 'babybels'
        },
        {
            id: 'bagels',
            name: 'bagels'
        },
        {
            id: 'baguettes',
            name: 'baguettes'
        },
        {
            id: 'balls',
            name: 'balls'
        },
        {
            id: 'Balmain_bay_bugs',
            name: 'Balmain bay bugs'
        },
        {
            id: 'bamboo_shoots',
            name: 'bamboo shoots'
        },
        {
            id: 'banana_chips',
            name: 'banana chips'
        },
        {
            id: 'banana_splits',
            name: 'banana splits'
        },
        {
            id: 'bananas',
            name: 'bananas'
        },
        {
            id: 'baos',
            name: 'baos'
        },
        {
            id: 'bars',
            name: 'bars'
        },
        {
            id: 'beans',
            name: 'beans'
        },
        {
            id: 'beetroots',
            name: 'beetroots'
        },
        {
            id: 'berries',
            name: 'berries'
        },
        {
            id: 'biscuits',
            name: 'biscuits'
        },
        {
            id: 'bite_size_pieces',
            name: 'bite size pieces'
        },
        {
            id: 'bottles',
            name: 'bottles'
        },
        {
            id: 'boxes',
            name: 'boxes'
        },
        {
            id: 'brains',
            name: 'brains'
        },
        {
            id: 'breasts',
            name: 'breasts'
        },
        {
            id: 'brussel_sprouts',
            name: 'brussel sprouts'
        },
        {
            id: 'buckets',
            name: 'buckets'
        },
        {
            id: 'bullets',
            name: 'bullets'
        },
        {
            id: 'bunches',
            name: 'bunches'
        },
        {
            id: 'buns',
            name: 'buns'
        },
        {
            id: 'buns_or_scrolls',
            name: 'buns or scrolls'
        },
        {
            id: 'burgers',
            name: 'burgers'
        },
        {
            id: 'cabbages',
            name: 'cabbages'
        },
        {
            id: 'cakes',
            name: 'cakes'
        },
        {
            id: 'calamari_rings',
            name: 'calamari rings'
        },
        {
            id: 'cannelloni_tubes',
            name: 'cannelloni tubes'
        },
        {
            id: 'cannolis',
            name: 'cannolis'
        },
        {
            id: 'capers',
            name: 'capers'
        },
        {
            id: 'capsicums',
            name: 'capsicums'
        },
        {
            id: 'carpaccio_slices',
            name: 'carpaccio slices'
        },
        {
            id: 'carrots',
            name: 'carrots'
        },
        {
            id: 'cartons',
            name: 'cartons'
        },
        {
            id: 'cassavas',
            name: 'cassavas'
        },
        {
            id: 'celeriacs',
            name: 'celeriacs'
        },
        {
            id: 'cevaps',
            name: 'cevaps'
        },
        {
            id: 'chapattis',
            name: 'chapattis'
        },
        {
            id: 'cheese_fruits',
            name: 'cheese fruits'
        },
        {
            id: 'cherries',
            name: 'cherries'
        },
        {
            id: 'chillies',
            name: 'chillies'
        },
        {
            id: 'chips',
            name: 'chips'
        },
        {
            id: 'choc_tops',
            name: 'choc tops'
        },
        {
            id: 'chocolates',
            name: 'chocolates'
        },
        {
            id: 'chokos',
            name: 'chokos'
        },
        {
            id: 'churros',
            name: 'churros'
        },
        {
            id: 'cloves',
            name: 'cloves'
        },
        {
            id: 'cobbettes',
            name: 'cobbettes'
        },
        {
            id: 'cobs',
            name: 'cobs'
        },
        {
            id: 'cocktail_frankfurts',
            name: 'cocktail frankfurts'
        },
        {
            id: 'cocktail_sausages',
            name: 'cocktail sausages'
        },
        {
            id: 'coconuts',
            name: 'coconuts'
        },
        {
            id: 'cones',
            name: 'cones'
        },
        {
            id: 'crab_claws',
            name: 'crab claws'
        },
        {
            id: 'crabs',
            name: 'crabs'
        },
        {
            id: 'crackers',
            name: 'crackers'
        },
        {
            id: 'crackles',
            name: 'crackles'
        },
        {
            id: 'croissants',
            name: 'croissants'
        },
        {
            id: 'cronuts',
            name: 'cronuts'
        },
        {
            id: 'croquettes',
            name: 'croquettes'
        },
        {
            id: 'croutons',
            name: 'croutons'
        },
        {
            id: 'cubes',
            name: 'cubes'
        },
        {
            id: 'cucumbers',
            name: 'cucumbers'
        },
        {
            id: 'cumquats',
            name: 'cumquats'
        },
        {
            id: 'cupcakes',
            name: 'cupcakes'
        },
        {
            id: 'cups',
            name: 'cups'
        },
        {
            id: 'cups_or_sachets',
            name: 'cups or sachets'
        },
        {
            id: 'currants',
            name: 'currants'
        },
        {
            id: 'curry_puffs',
            name: 'curry puffs'
        },
        {
            id: 'custard_fruits',
            name: 'custard fruits'
        },
        {
            id: 'cutlets',
            name: 'cutlets'
        },
        {
            id: 'danishes',
            name: 'danishes'
        },
        {
            id: 'dates',
            name: 'dates'
        },
        {
            id: 'diced_pieces',
            name: 'diced pieces'
        },
        {
            id: 'dim_sims',
            name: 'dim sims'
        },
        {
            id: 'dixie_cups',
            name: 'dixie cups'
        },
        {
            id: 'dolmades',
            name: 'dolmades'
        },
        {
            id: 'double_patty_burgers',
            name: 'double patty burgers'
        },
        {
            id: 'double_shot_espresso_cups',
            name: 'double shot espresso cups'
        },
        {
            id: 'doughnuts',
            name: 'doughnuts'
        },
        {
            id: 'dragon_fruit',
            name: 'dragon fruit'
        },
        {
            id: 'drops',
            name: 'drops'
        },
        {
            id: 'drumsticks',
            name: 'drumsticks'
        },
        {
            id: 'dumplings',
            name: 'dumplings'
        },
        {
            id: 'durians',
            name: 'durians'
        },
        {
            id: 'eclairs',
            name: 'eclairs'
        },
        {
            id: 'eggplants',
            name: 'eggplants'
        },
        {
            id: 'eggs',
            name: 'eggs'
        },
        {
            id: 'eggs_benedict',
            name: 'eggs benedict'
        },
        {
            id: 'espresso_cups',
            name: 'espresso cups'
        },
        {
            id: 'extra_large_carrots',
            name: 'extra large carrots'
        },
        {
            id: 'extra_large_pears',
            name: 'extra large pears'
        },
        {
            id: 'extra_large_giant_mushrooms',
            name: 'extra large/giant mushrooms'
        },
        {
            id: 'falafels',
            name: 'falafels'
        },
        {
            id: 'family_pies',
            name: 'family pies'
        },
        {
            id: 'family_size_bags',
            name: 'family size bags'
        },
        {
            id: 'family_size_microwavable_bags',
            name: 'family size microwavable bags'
        },
        {
            id: 'family_size_packets',
            name: 'family size packets'
        },
        {
            id: 'family_size_pavlovas',
            name: 'family size pavlovas'
        },
        {
            id: 'feijoas',
            name: 'feijoas'
        },
        {
            id: 'fennels',
            name: 'fennels'
        },
        {
            id: 'figs',
            name: 'figs'
        },
        {
            id: 'fillets',
            name: 'fillets'
        },
        {
            id: 'fillets_or_steaks',
            name: 'fillets or steaks'
        },
        {
            id: 'fingers',
            name: 'fingers'
        },
        {
            id: 'fish',
            name: 'fish'
        },
        {
            id: 'fish_fingers',
            name: 'fish fingers'
        },
        {
            id: 'flatbreads',
            name: 'flatbreads'
        },
        {
            id: 'frankfurts',
            name: 'frankfurts'
        },
        {
            id: 'freckles',
            name: 'freckles'
        },
        {
            id: 'friands',
            name: 'friands'
        },
        {
            id: 'fritters',
            name: 'fritters'
        },
        {
            id: 'fruits',
            name: 'fruits'
        },
        {
            id: 'gems',
            name: 'gems'
        },
        {
            id: 'gherkins',
            name: 'gherkins'
        },
        {
            id: 'giblets',
            name: 'giblets'
        },
        {
            id: 'grapes',
            name: 'grapes'
        },
        {
            id: 'grubs',
            name: 'grubs'
        },
        {
            id: 'guavas',
            name: 'guavas'
        },
        {
            id: 'half_size_baguettes',
            name: 'half-size baguettes'
        },
        {
            id: 'halves',
            name: 'halves'
        },
        {
            id: 'hamburger_rolls',
            name: 'hamburger rolls'
        },
        {
            id: 'handfuls',
            name: 'handfuls'
        },
        {
            id: 'hash_browns',
            name: 'hash browns'
        },
        {
            id: 'hearts',
            name: 'hearts'
        },
        {
            id: 'honey_joys',
            name: 'honey joys'
        },
        {
            id: 'hot_cross_buns',
            name: 'hot cross buns'
        },
        {
            id: 'hot_dogs',
            name: 'hot dogs'
        },
        {
            id: 'ice_creams',
            name: 'ice creams'
        },
        {
            id: 'individual_cakes',
            name: 'individual cakes'
        },
        {
            id: 'individual_pasties',
            name: 'individual pasties'
        },
        {
            id: 'individual_pavlovas',
            name: 'individual pavlovas'
        },
        {
            id: 'individual_pies',
            name: 'individual pies'
        },
        {
            id: 'individual_quiches',
            name: 'individual quiches'
        },
        {
            id: 'individual_sausage_rolls',
            name: 'individual sausage rolls'
        },
        {
            id: 'individual_strudels',
            name: 'individual strudels'
        },
        {
            id: 'individual_tarts',
            name: 'individual tarts'
        },
        {
            id: 'insects',
            name: 'insects'
        },
        {
            id: 'jackfruits',
            name: 'jackfruits'
        },
        {
            id: 'jaffas',
            name: 'jaffas'
        },
        {
            id: 'jars',
            name: 'jars'
        },
        {
            id: 'jars_or_pouches',
            name: 'jars or pouches'
        },
        {
            id: 'jatz_cracker_size_slices',
            name: 'jatz cracker-size slices'
        },
        {
            id: 'jumbo_takeaway_serves',
            name: 'jumbo takeaway serves'
        },
        {
            id: 'junior_burgers',
            name: 'junior burgers'
        },
        {
            id: 'kebabs',
            name: 'kebabs'
        },
        {
            id: 'kernels',
            name: 'kernels'
        },
        {
            id: 'kidneys',
            name: 'kidneys'
        },
        {
            id: 'kievs',
            name: 'kievs'
        },
        {
            id: 'king_prawns',
            name: 'king prawns'
        },
        {
            id: 'kiwifruit',
            name: 'kiwifruit'
        },
        {
            id: 'lamingtons',
            name: 'lamingtons'
        },
        {
            id: 'large_avocadoes',
            name: 'large avocadoes'
        },
        {
            id: 'large_balls',
            name: 'large balls'
        },
        {
            id: 'large_beetroots',
            name: 'large beetroots'
        },
        {
            id: 'large_berries',
            name: 'large berries'
        },
        {
            id: 'large_biscuits',
            name: 'large biscuits'
        },
        {
            id: 'large_bunnies_or_bilbies',
            name: 'large bunnies or bilbies'
        },
        {
            id: 'large_buns',
            name: 'large buns'
        },
        {
            id: 'large_capsicums',
            name: 'large capsicums'
        },
        {
            id: 'large_carrots',
            name: 'large carrots'
        },
        {
            id: 'large_cartons',
            name: 'large cartons'
        },
        {
            id: 'large_chickens',
            name: 'large chickens'
        },
        {
            id: 'large_chops',
            name: 'large chops'
        },
        {
            id: 'large_cones',
            name: 'large cones'
        },
        {
            id: 'large_cucumbers',
            name: 'large cucumbers'
        },
        {
            id: 'large_cups_or_sachets',
            name: 'large cups or sachets'
        },
        {
            id: 'large_cutlets',
            name: 'large cutlets'
        },
        {
            id: 'large_drumsticks',
            name: 'large drumsticks'
        },
        {
            id: 'large_dumplings',
            name: 'large dumplings'
        },
        {
            id: 'large_easter_eggs',
            name: 'large easter eggs'
        },
        {
            id: 'large_eggplants',
            name: 'large eggplants'
        },
        {
            id: 'large_feet',
            name: 'large feet'
        },
        {
            id: 'large_fillets',
            name: 'large fillets'
        },
        {
            id: 'large_fillets_or_steaks',
            name: 'large fillets or steaks'
        },
        {
            id: 'large_flatbreads',
            name: 'large flatbreads'
        },
        {
            id: 'large_grapefruits',
            name: 'large grapefruits'
        },
        {
            id: 'large_leaves',
            name: 'large leaves'
        },
        {
            id: 'large_leeks',
            name: 'large leeks'
        },
        {
            id: 'large_lettuces',
            name: 'large lettuces'
        },
        {
            id: 'large_lollipops',
            name: 'large lollipops'
        },
        {
            id: 'large_mangos',
            name: 'large mangos'
        },
        {
            id: 'large_marshmallows',
            name: 'large marshmallows'
        },
        {
            id: 'large_muffins',
            name: 'large muffins'
        },
        {
            id: 'large_mushrooms',
            name: 'large mushrooms'
        },
        {
            id: 'large_octopuses',
            name: 'large octopuses'
        },
        {
            id: 'large_onions',
            name: 'large onions'
        },
        {
            id: 'large_pappadams',
            name: 'large pappadams'
        },
        {
            id: 'large_patties_or_cakes',
            name: 'large patties or cakes'
        },
        {
            id: 'large_pears',
            name: 'large pears'
        },
        {
            id: 'large_pieces',
            name: 'large pieces'
        },
        {
            id: 'large_pineapples',
            name: 'large pineapples'
        },
        {
            id: 'large_potatoes',
            name: 'large potatoes'
        },
        {
            id: 'large_pouches',
            name: 'large pouches'
        },
        {
            id: 'large_quiches',
            name: 'large quiches'
        },
        {
            id: 'large_rectangles',
            name: 'large rectangles'
        },
        {
            id: 'large_rolls',
            name: 'large rolls'
        },
        {
            id: 'large_shanks',
            name: 'large shanks'
        },
        {
            id: 'large_single_serve_packets',
            name: 'large single serve packets'
        },
        {
            id: 'large_single_serve_pouches_or_tubs',
            name: 'large single serve pouches or tubs'
        },
        {
            id: 'large_single_serve_tubs',
            name: 'large single serve tubs'
        },
        {
            id: 'large_stalks',
            name: 'large stalks'
        },
        {
            id: 'large_sticks',
            name: 'large sticks'
        },
        {
            id: 'large_sundaes',
            name: 'large sundaes'
        },
        {
            id: 'large_sweet_potatoes',
            name: 'large sweet potatoes'
        },
        {
            id: 'large_takeaway_serves',
            name: 'large takeaway serves'
        },
        {
            id: 'large_thighs',
            name: 'large thighs'
        },
        {
            id: 'large_yams',
            name: 'large yams'
        },
        {
            id: 'large_zucchinis',
            name: 'large zucchinis'
        },
        {
            id: 'large_extra_large_peaches',
            name: 'large/extra large peaches'
        },
        {
            id: 'leaves',
            name: 'leaves'
        },
        {
            id: 'lebanese_eggplants',
            name: 'lebanese eggplants'
        },
        {
            id: 'leeks',
            name: 'leeks'
        },
        {
            id: 'legs',
            name: 'legs'
        },
        {
            id: 'lemons',
            name: 'lemons'
        },
        {
            id: 'lettuces',
            name: 'lettuces'
        },
        {
            id: 'limes',
            name: 'limes'
        },
        {
            id: 'lobsters_or_crayfish',
            name: 'lobsters or crayfish'
        },
        {
            id: 'lollies',
            name: 'lollies'
        },
        {
            id: 'lollipops',
            name: 'lollipops'
        },
        {
            id: 'long_slices',
            name: 'long slices'
        },
        {
            id: 'loquats',
            name: 'loquats'
        },
        {
            id: 'lychees',
            name: 'lychees'
        },
        {
            id: 'm_ms',
            name: 'm&ms'
        },
        {
            id: 'maltesers',
            name: 'maltesers'
        },
        {
            id: 'marshmallows',
            name: 'marshmallows'
        },
        {
            id: 'McDonalds_single_serve_packets',
            name: 'McDonalds single serve packets'
        },
        {
            id: 'McFlurries',
            name: 'McFlurries'
        },
        {
            id: 'meatballs',
            name: 'meatballs'
        },
        {
            id: 'medium_avocadoes',
            name: 'medium avocadoes'
        },
        {
            id: 'medium_berries',
            name: 'medium berries'
        },
        {
            id: 'medium_bunnies_or_bilbies',
            name: 'medium bunnies or bilbies'
        },
        {
            id: 'medium_capsicums',
            name: 'medium capsicums'
        },
        {
            id: 'medium_carrots',
            name: 'medium carrots'
        },
        {
            id: 'medium_chickens',
            name: 'medium chickens'
        },
        {
            id: 'medium_chops',
            name: 'medium chops'
        },
        {
            id: 'medium_cucumbers',
            name: 'medium cucumbers'
        },
        {
            id: 'medium_cutlets',
            name: 'medium cutlets'
        },
        {
            id: 'medium_drumsticks',
            name: 'medium drumsticks'
        },
        {
            id: 'medium_dumplings',
            name: 'medium dumplings'
        },
        {
            id: 'medium_easter_eggs',
            name: 'medium easter eggs'
        },
        {
            id: 'medium_eggplants',
            name: 'medium eggplants'
        },
        {
            id: 'medium_fillets',
            name: 'medium fillets'
        },
        {
            id: 'medium_fillets_or_steaks',
            name: 'medium fillets or steaks'
        },
        {
            id: 'medium_grapefruits',
            name: 'medium grapefruits'
        },
        {
            id: 'medium_leaves',
            name: 'medium leaves'
        },
        {
            id: 'medium_leeks',
            name: 'medium leeks'
        },
        {
            id: 'medium_lettuces',
            name: 'medium lettuces'
        },
        {
            id: 'medium_mangos',
            name: 'medium mangos'
        },
        {
            id: 'medium_mushrooms',
            name: 'medium mushrooms'
        },
        {
            id: 'medium_octopuses',
            name: 'medium octopuses'
        },
        {
            id: 'medium_onions',
            name: 'medium onions'
        },
        {
            id: 'medium_pears',
            name: 'medium pears'
        },
        {
            id: 'medium_pieces',
            name: 'medium pieces'
        },
        {
            id: 'medium_potatoes',
            name: 'medium potatoes'
        },
        {
            id: 'medium_shanks',
            name: 'medium shanks'
        },
        {
            id: 'medium_sweet_potatoes',
            name: 'medium sweet potatoes'
        },
        {
            id: 'medium_takeaway_serves',
            name: 'medium takeaway serves'
        },
        {
            id: 'medium_thighs',
            name: 'medium thighs'
        },
        {
            id: 'medium_yams',
            name: 'medium yams'
        },
        {
            id: 'medium_zucchinis',
            name: 'medium zucchinis'
        },
        {
            id: 'medium_large_pears',
            name: 'medium/large pears'
        },
        {
            id: 'medium_large_pieces',
            name: 'medium/large pieces'
        },
        {
            id: 'medium_large_prawns',
            name: 'medium/large prawns'
        },
        {
            id: 'medium_large_swedes',
            name: 'medium/large swedes'
        },
        {
            id: 'medium_large_wings',
            name: 'medium/large wings'
        },
        {
            id: 'melons',
            name: 'melons'
        },
        {
            id: 'meringues',
            name: 'meringues'
        },
        {
            id: 'microwavable_bags',
            name: 'microwavable bags'
        },
        {
            id: 'microwavable_cups',
            name: 'microwavable cups'
        },
        {
            id: 'mini_babybels',
            name: 'mini babybels'
        },
        {
            id: 'mini_bagels',
            name: 'mini bagels'
        },
        {
            id: 'mini_bars',
            name: 'mini bars'
        },
        {
            id: 'mini_biscuits',
            name: 'mini biscuits'
        },
        {
            id: 'mini_bunnies_or_bilbies',
            name: 'mini bunnies or bilbies'
        },
        {
            id: 'mini_buns',
            name: 'mini buns'
        },
        {
            id: 'mini_cakes',
            name: 'mini cakes'
        },
        {
            id: 'mini_churros',
            name: 'mini churros'
        },
        {
            id: 'mini_corn_cakes',
            name: 'mini corn cakes'
        },
        {
            id: 'mini_croissants',
            name: 'mini croissants'
        },
        {
            id: 'mini_cronuts',
            name: 'mini cronuts'
        },
        {
            id: 'mini_cupcakes',
            name: 'mini cupcakes'
        },
        {
            id: 'mini_curry_puffs',
            name: 'mini curry puffs'
        },
        {
            id: 'mini_danishes',
            name: 'mini danishes'
        },
        {
            id: 'mini_doughnuts',
            name: 'mini doughnuts'
        },
        {
            id: 'mini_easter_eggs',
            name: 'mini easter eggs'
        },
        {
            id: 'mini_friands',
            name: 'mini friands'
        },
        {
            id: 'mini_hot_dogs',
            name: 'mini hot dogs'
        },
        {
            id: 'mini_ice_creams',
            name: 'mini ice creams'
        },
        {
            id: 'mini_kebabs',
            name: 'mini kebabs'
        },
        {
            id: 'mini_loaves',
            name: 'mini loaves'
        },
        {
            id: 'mini_muffins',
            name: 'mini muffins'
        },
        {
            id: 'mini_pancakes',
            name: 'mini pancakes'
        },
        {
            id: 'mini_pasties',
            name: 'mini pasties'
        },
        {
            id: 'mini_pastries',
            name: 'mini pastries'
        },
        {
            id: 'mini_pies',
            name: 'mini pies'
        },
        {
            id: 'mini_quiches',
            name: 'mini quiches'
        },
        {
            id: 'mini_rice_cakes',
            name: 'mini rice cakes'
        },
        {
            id: 'mini_samosas',
            name: 'mini samosas'
        },
        {
            id: 'mini_sausage_rolls',
            name: 'mini sausage rolls'
        },
        {
            id: 'mini_spring_rolls',
            name: 'mini spring rolls'
        },
        {
            id: 'mini_sticks',
            name: 'mini sticks'
        },
        {
            id: 'mini_sticks_or_bars',
            name: 'mini sticks or bars'
        },
        {
            id: 'mini_strudels',
            name: 'mini strudels'
        },
        {
            id: 'mini_tarts',
            name: 'mini tarts'
        },
        {
            id: 'mini_tubes',
            name: 'mini tubes'
        },
        {
            id: 'mini_tubs',
            name: 'mini tubs'
        },
        {
            id: 'mini_snack_wraps',
            name: 'mini/snack wraps'
        },
        {
            id: 'mini_snacking_capsicums',
            name: 'mini/snacking capsicums'
        },
        {
            id: 'mini_snacking_carrots',
            name: 'mini/snacking carrots'
        },
        {
            id: 'mini_snacking_cucumbers',
            name: 'mini/snacking cucumbers'
        },
        {
            id: 'Moreton_bay_bugs',
            name: 'Moreton bay bugs'
        },
        {
            id: 'muffins',
            name: 'muffins'
        },
        {
            id: 'mushrooms',
            name: 'mushrooms'
        },
        {
            id: 'mussels',
            name: 'mussels'
        },
        {
            id: 'mutton_birds',
            name: 'mutton-birds'
        },
        {
            id: 'naans',
            name: 'naans'
        },
        {
            id: 'nectarines',
            name: 'nectarines'
        },
        {
            id: 'nuggets',
            name: 'nuggets'
        },
        {
            id: 'nuts',
            name: 'nuts'
        },
        {
            id: 'okras',
            name: 'okras'
        },
        {
            id: 'olives',
            name: 'olives'
        },
        {
            id: 'onions',
            name: 'onions'
        },
        {
            id: 'oranges',
            name: 'oranges'
        },
        {
            id: 'oysters',
            name: 'oysters'
        },
        {
            id: 'packets',
            name: 'packets'
        },
        {
            id: 'pancakes',
            name: 'pancakes'
        },
        {
            id: 'pappadams',
            name: 'pappadams'
        },
        {
            id: 'parmigianas',
            name: 'parmigianas'
        },
        {
            id: 'parsnips',
            name: 'parsnips'
        },
        {
            id: 'passionfruits',
            name: 'passionfruits'
        },
        {
            id: 'pastries',
            name: 'pastries'
        },
        {
            id: 'patties',
            name: 'patties'
        },
        {
            id: 'patties_or_cakes',
            name: 'patties or cakes'
        },
        {
            id: 'patties_or_rissoles',
            name: 'patties or rissoles'
        },
        {
            id: 'pawpaws',
            name: 'pawpaws'
        },
        {
            id: 'peaches',
            name: 'peaches'
        },
        {
            id: 'pears',
            name: 'pears'
        },
        {
            id: 'peas',
            name: 'peas'
        },
        {
            id: 'peppers',
            name: 'peppers'
        },
        {
            id: 'periwinkles',
            name: 'periwinkles'
        },
        {
            id: 'persimmons',
            name: 'persimmons'
        },
        {
            id: 'pieces',
            name: 'pieces'
        },
        {
            id: 'pies',
            name: 'pies'
        },
        {
            id: 'pikelets',
            name: 'pikelets'
        },
        {
            id: 'pipis',
            name: 'pipis'
        },
        {
            id: 'pizza_pockets',
            name: 'pizza pockets'
        },
        {
            id: 'pizzas',
            name: 'pizzas'
        },
        {
            id: 'plantains',
            name: 'plantains'
        },
        {
            id: 'plums',
            name: 'plums'
        },
        {
            id: 'pods',
            name: 'pods'
        },
        {
            id: 'pomegranates',
            name: 'pomegranates'
        },
        {
            id: 'pop_tarts',
            name: 'pop tarts'
        },
        {
            id: 'potatoes',
            name: 'potatoes'
        },
        {
            id: 'pouches',
            name: 'pouches'
        },
        {
            id: 'prawns',
            name: 'prawns'
        },
        {
            id: 'pre_packaged_bags',
            name: 'pre-packaged bags'
        },
        {
            id: 'pre_packaged_single_serve_bowls',
            name: 'pre-packaged single serve bowls'
        },
        {
            id: 'pre_packaged_slices',
            name: 'pre-packaged slices'
        },
        {
            id: 'pretzels',
            name: 'pretzels'
        },
        {
            id: 'profiteroles',
            name: 'profiteroles'
        },
        {
            id: 'prunes',
            name: 'prunes'
        },
        {
            id: 'puddings',
            name: 'puddings'
        },
        {
            id: 'punnets',
            name: 'punnets'
        },
        {
            id: 'quails',
            name: 'quails'
        },
        {
            id: 'quandongs',
            name: 'quandongs'
        },
        {
            id: 'quarter_melons',
            name: 'quarter melons'
        },
        {
            id: 'quinces',
            name: 'quinces'
        },
        {
            id: 'radishes',
            name: 'radishes'
        },
        {
            id: 'raisins',
            name: 'raisins'
        },
        {
            id: 'rambutans',
            name: 'rambutans'
        },
        {
            id: 'ramekins',
            name: 'ramekins'
        },
        {
            id: 'rashers',
            name: 'rashers'
        },
        {
            id: 'ravioli_or_tortellinis',
            name: 'ravioli or tortellinis'
        },
        {
            id: 'rectangle_crackers',
            name: 'rectangle crackers'
        },
        {
            id: 'rectangle_flatbreads',
            name: 'rectangle flatbreads'
        },
        {
            id: 'regular_balls',
            name: 'regular balls'
        },
        {
            id: 'regular_biscuits',
            name: 'regular biscuits'
        },
        {
            id: 'regular_cones',
            name: 'regular cones'
        },
        {
            id: 'regular_flatbreads',
            name: 'regular flatbreads'
        },
        {
            id: 'regular_kebabs',
            name: 'regular kebabs'
        },
        {
            id: 'regular_muffins',
            name: 'regular muffins'
        },
        {
            id: 'regular_rice_cakes',
            name: 'regular rice cakes'
        },
        {
            id: 'regular_rolls',
            name: 'regular rolls'
        },
        {
            id: 'regular_sticks',
            name: 'regular sticks'
        },
        {
            id: 'regular_takeaway_serves',
            name: 'regular takeaway serves'
        },
        {
            id: 'regular_large_pizzas',
            name: 'regular/large pizzas'
        },
        {
            id: 'ribs',
            name: 'ribs'
        },
        {
            id: 'rings',
            name: 'rings'
        },
        {
            id: 'rock_cakes',
            name: 'rock cakes'
        },
        {
            id: 'rolls',
            name: 'rolls'
        },
        {
            id: 'rostis',
            name: 'rostis'
        },
        {
            id: 'rotis',
            name: 'rotis'
        },
        {
            id: 'round_crackers',
            name: 'round crackers'
        },
        {
            id: 'round_crumpets',
            name: 'round crumpets'
        },
        {
            id: 'round_slices',
            name: 'round slices'
        },
        {
            id: 'rows',
            name: 'rows'
        },
        {
            id: 'rusks',
            name: 'rusks'
        },
        {
            id: 'sachets',
            name: 'sachets'
        },
        {
            id: 'samosas',
            name: 'samosas'
        },
        {
            id: 'sandwich_size_slices',
            name: 'sandwich size slices'
        },
        {
            id: 'sandwich_slices',
            name: 'sandwich slices'
        },
        {
            id: 'sandwich_thins',
            name: 'sandwich thins'
        },
        {
            id: 'sandwiches',
            name: 'sandwiches'
        },
        {
            id: 'sausages',
            name: 'sausages'
        },
        {
            id: 'scallops',
            name: 'scallops'
        },
        {
            id: 'schnitzels',
            name: 'schnitzels'
        },
        {
            id: 'scones',
            name: 'scones'
        },
        {
            id: 'scoops',
            name: 'scoops'
        },
        {
            id: 'seeds',
            name: 'seeds'
        },
        {
            id: 'segments',
            name: 'segments'
        },
        {
            id: 'serves',
            name: 'serves'
        },
        {
            id: 'shallots',
            name: 'shallots'
        },
        {
            id: 'shaved_slices',
            name: 'shaved slices'
        },
        {
            id: 'sheets',
            name: 'sheets'
        },
        {
            id: 'single_patty_burgers',
            name: 'single patty burgers'
        },
        {
            id: 'single_serve_bags',
            name: 'single serve bags'
        },
        {
            id: 'single_serve_boxes',
            name: 'single serve boxes'
        },
        {
            id: 'single_serve_cups_or_sachets',
            name: 'single serve cups or sachets'
        },
        {
            id: 'single_serve_packets',
            name: 'single serve packets'
        },
        {
            id: 'single_serve_sachets',
            name: 'single serve sachets'
        },
        {
            id: 'single_serve_tubs',
            name: 'single serve tubs'
        },
        {
            id: 'six_inch_sub_rolls',
            name: 'six inch sub rolls'
        },
        {
            id: 'slices',
            name: 'slices'
        },
        {
            id: 'slices_or_onion_rings',
            name: 'slices or onion rings'
        },
        {
            id: 'sliders',
            name: 'sliders'
        },
        {
            id: 'small_avocadoes',
            name: 'small avocadoes'
        },
        {
            id: 'small_balls',
            name: 'small balls'
        },
        {
            id: 'small_berries',
            name: 'small berries'
        },
        {
            id: 'small_bottles',
            name: 'small bottles'
        },
        {
            id: 'small_bunnies_or_bilbies',
            name: 'small bunnies or bilbies'
        },
        {
            id: 'small_buns_or_scrolls',
            name: 'small buns or scrolls'
        },
        {
            id: 'small_capsicums',
            name: 'small capsicums'
        },
        {
            id: 'small_carrots',
            name: 'small carrots'
        },
        {
            id: 'small_cartons',
            name: 'small cartons'
        },
        {
            id: 'small_chickens',
            name: 'small chickens'
        },
        {
            id: 'small_chops',
            name: 'small chops'
        },
        {
            id: 'small_cucumbers',
            name: 'small cucumbers'
        },
        {
            id: 'small_cutlets',
            name: 'small cutlets'
        },
        {
            id: 'small_dinner_rolls',
            name: 'small dinner rolls'
        },
        {
            id: 'small_drumsticks',
            name: 'small drumsticks'
        },
        {
            id: 'small_dumplings',
            name: 'small dumplings'
        },
        {
            id: 'small_easter_eggs',
            name: 'small easter eggs'
        },
        {
            id: 'small_eggplants',
            name: 'small eggplants'
        },
        {
            id: 'small_feet',
            name: 'small feet'
        },
        {
            id: 'small_fillets',
            name: 'small fillets'
        },
        {
            id: 'small_fillets_or_steaks',
            name: 'small fillets or steaks'
        },
        {
            id: 'small_flatbreads',
            name: 'small flatbreads'
        },
        {
            id: 'small_grapefruits',
            name: 'small grapefruits'
        },
        {
            id: 'small_kebabs',
            name: 'small kebabs'
        },
        {
            id: 'small_leaves',
            name: 'small leaves'
        },
        {
            id: 'small_leeks',
            name: 'small leeks'
        },
        {
            id: 'small_lettuces',
            name: 'small lettuces'
        },
        {
            id: 'small_mangos',
            name: 'small mangos'
        },
        {
            id: 'small_mushrooms',
            name: 'small mushrooms'
        },
        {
            id: 'small_naans',
            name: 'small naans'
        },
        {
            id: 'small_onions',
            name: 'small onions'
        },
        {
            id: 'small_pears',
            name: 'small pears'
        },
        {
            id: 'small_pieces',
            name: 'small pieces'
        },
        {
            id: 'small_potatoes',
            name: 'small potatoes'
        },
        {
            id: 'small_pouches',
            name: 'small pouches'
        },
        {
            id: 'small_rolls',
            name: 'small rolls'
        },
        {
            id: 'small_rotis',
            name: 'small rotis'
        },
        {
            id: 'small_shanks',
            name: 'small shanks'
        },
        {
            id: 'small_single_serve_packets',
            name: 'small single serve packets'
        },
        {
            id: 'small_single_serve_pouches_or_tubs',
            name: 'small single serve pouches or tubs'
        },
        {
            id: 'small_single_serve_tubs',
            name: 'small single serve tubs'
        },
        {
            id: 'small_slices',
            name: 'small slices'
        },
        {
            id: 'small_squares',
            name: 'small squares'
        },
        {
            id: 'small_swedes',
            name: 'small swedes'
        },
        {
            id: 'small_sweet_potatoes',
            name: 'small sweet potatoes'
        },
        {
            id: 'small_takeaway_serves',
            name: 'small takeaway serves'
        },
        {
            id: 'small_thighs',
            name: 'small thighs'
        },
        {
            id: 'small_wings',
            name: 'small wings'
        },
        {
            id: 'small_yams',
            name: 'small yams'
        },
        {
            id: 'small_zucchinis',
            name: 'small zucchinis'
        },
        {
            id: 'small_baby_carrots',
            name: 'small/baby carrots'
        },
        {
            id: 'small_medium_beetroots',
            name: 'small/medium beetroots'
        },
        {
            id: 'small_medium_peaches',
            name: 'small/medium peaches'
        },
        {
            id: 'small_medium_pineapples',
            name: 'small/medium pineapples'
        },
        {
            id: 'small_medium_stalks',
            name: 'small/medium stalks'
        },
        {
            id: 'small_medium_sticks',
            name: 'small/medium sticks'
        },
        {
            id: 'small_mini_bases',
            name: 'small/mini bases'
        },
        {
            id: 'small_mini_biscuits',
            name: 'small/mini biscuits'
        },
        {
            id: 'small_mini_cones',
            name: 'small/mini cones'
        },
        {
            id: 'small_mini_crackers',
            name: 'small/mini crackers'
        },
        {
            id: 'small_mini_meringues',
            name: 'small/mini meringues'
        },
        {
            id: 'small_mini_pieces',
            name: 'small/mini pieces'
        },
        {
            id: 'small_mini_pizzas',
            name: 'small/mini pizzas'
        },
        {
            id: 'small_mini_rice_cakes',
            name: 'small/mini rice cakes'
        },
        {
            id: 'small_mini_wagon_wheels',
            name: 'small/mini wagon wheels'
        },
        {
            id: 'small_snack_size_sheets',
            name: 'small/snack size sheets'
        },
        {
            id: 'smarties',
            name: 'smarties'
        },
        {
            id: 'snack_size_boxes',
            name: 'snack size boxes'
        },
        {
            id: 'snow_peas',
            name: 'snow peas'
        },
        {
            id: 'snowballs',
            name: 'snowballs'
        },
        {
            id: 'solid_bunnies_or_bilbies',
            name: 'solid bunnies or bilbies'
        },
        {
            id: 'solid_easter_eggs',
            name: 'solid easter eggs'
        },
        {
            id: 'souffles',
            name: 'souffles'
        },
        {
            id: 'spears',
            name: 'spears'
        },
        {
            id: 'sponge_rolls',
            name: 'sponge rolls'
        },
        {
            id: 'sprays',
            name: 'sprays'
        },
        {
            id: 'spring_onions',
            name: 'spring onions'
        },
        {
            id: 'spring_rolls',
            name: 'spring rolls'
        },
        {
            id: 'sprouts',
            name: 'sprouts'
        },
        {
            id: 'square_crackers',
            name: 'square crackers'
        },
        {
            id: 'square_crumpets',
            name: 'square crumpets'
        },
        {
            id: 'squares',
            name: 'squares'
        },
        {
            id: 'squashes',
            name: 'squashes'
        },
        {
            id: 'stalks',
            name: 'stalks'
        },
        {
            id: 'star_fruit',
            name: 'star fruit'
        },
        {
            id: 'steaks',
            name: 'steaks'
        },
        {
            id: 'sticks',
            name: 'sticks'
        },
        {
            id: 'sticks_or_bars',
            name: 'sticks or bars'
        },
        {
            id: 'Storms',
            name: 'Storms'
        },
        {
            id: 'straws',
            name: 'straws'
        },
        {
            id: 'strips',
            name: 'strips'
        },
        {
            id: 'sugar_snap_peas',
            name: 'sugar snap peas'
        },
        {
            id: 'sultanas',
            name: 'sultanas'
        },
        {
            id: 'sundaes',
            name: 'sundaes'
        },
        {
            id: 'sunny_boys',
            name: 'sunny boys'
        },
        {
            id: 'supermarket_tubs',
            name: 'supermarket tubs'
        },
        {
            id: 'tablespoons',
            name: 'tablespoons'
        },
        {
            id: 'tablets',
            name: 'tablets'
        },
        {
            id: 'taco_shells',
            name: 'taco shells'
        },
        {
            id: 'tacos',
            name: 'tacos'
        },
        {
            id: 'tails',
            name: 'tails'
        },
        {
            id: 'takeaway_serves',
            name: 'takeaway serves'
        },
        {
            id: 'tamarillos',
            name: 'tamarillos'
        },
        {
            id: 'taros',
            name: 'taros'
        },
        {
            id: 'teaspoons',
            name: 'teaspoons'
        },
        {
            id: 'thai_eggplants',
            name: 'thai eggplants'
        },
        {
            id: 'thick_corn_cakes',
            name: 'thick corn cakes'
        },
        {
            id: 'thick_rice_cakes',
            name: 'thick rice cakes'
        },
        {
            id: 'thick_slices',
            name: 'thick slices'
        },
        {
            id: 'thighs',
            name: 'thighs'
        },
        {
            id: 'thin_corn_cakes',
            name: 'thin corn cakes'
        },
        {
            id: 'thin_rice_cakes',
            name: 'thin rice cakes'
        },
        {
            id: 'thin_slices',
            name: 'thin slices'
        },
        {
            id: 'toasts',
            name: 'toasts'
        },
        {
            id: 'tomatoes',
            name: 'tomatoes'
        },
        {
            id: 'truffles',
            name: 'truffles'
        },
        {
            id: 'tubes',
            name: 'tubes'
        },
        {
            id: 'tubs',
            name: 'tubs'
        },
        {
            id: 'turnips',
            name: 'turnips'
        },
        {
            id: 'turnovers',
            name: 'turnovers'
        },
        {
            id: 'twelve_inch_sub_rolls',
            name: 'twelve inch sub rolls'
        },
        {
            id: 'twists_or_straps',
            name: 'twists or straps'
        },
        {
            id: 'vegetables',
            name: 'vegetables'
        },
        {
            id: 'very_small_mushrooms',
            name: 'very small mushrooms'
        },
        {
            id: 'waffles',
            name: 'waffles'
        },
        {
            id: 'wagon_wheels',
            name: 'wagon wheels'
        },
        {
            id: 'wedge_slices',
            name: 'wedge slices'
        },
        {
            id: 'wedges',
            name: 'wedges'
        },
        {
            id: 'whole_chickens',
            name: 'whole chickens'
        },
        {
            id: 'whole_ducks',
            name: 'whole ducks'
        },
        {
            id: 'whole_melons',
            name: 'whole melons'
        },
        {
            id: 'whole_stuffed_flatbreads',
            name: 'whole stuffed flatbreads'
        },
        {
            id: 'wings',
            name: 'wings'
        },
        {
            id: 'worms',
            name: 'worms'
        },
        {
            id: 'wraps',
            name: 'wraps'
        },
        {
            id: 'yabbies',
            name: 'yabbies'
        }

    ];

    return _.sortBy(l, 'name');
};