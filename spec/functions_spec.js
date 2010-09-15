describe('color functions', function() {

    describe('toHex string', function() {
        beforeEach(function() {  });

        it('should noop if hex passed in', function() {
            expect("#123456".toHexColor()).toEqual('#123456');
        });
        it('should convert websafe color to hex', function() {
            expect("#369".toHexColor()).toEqual('#336699');
        });
        it('should convert black to hex', function() {
            expect("black".toHexColor()).toEqual('#000000');
        });
        it('should convert white to hex', function() {
            expect("white".toHexColor()).toEqual('#ffffff');
        });
        it('should convert olive to hex', function() {
            expect("olive".toHexColor()).toEqual('#808000');
        });
    });

    describe('parsing hex string', function() {

        var sample = "#123456";

        it('should set red', function() {
            expect(sample.toRGB()[0]).toEqual(18);
        });
        it('should set green', function() {
            expect(sample.toRGB()[1]).toEqual(52);
        });
        it('should set blue', function() {
            expect(sample.toRGB()[2]).toEqual(86);
        });
        it('should return red', function() {
            expect(sample.red()).toEqual(18);
        });
        it('should return red', function() {
            expect(sample.green()).toEqual(52);
        });
        it('should return red', function() {
            expect(sample.blue()).toEqual(86);
        });
    });

    describe('toHSL', function() {
        it('should convert white to hsl', function() {
           expect('#ffffff'.toHSL()).toEqual([0,0,100]);
        });
        it('should convert black to hsl', function() {
           expect('#000000'.toHSL()).toEqual([0,0,0]);
        });
        it('should convert red to hsl', function() {
           expect('#ff0000'.toHSL()).toEqual([0,100,50]);
        });
        it('should convert green to hsl', function() {
           expect('#00ff00'.toHSL()).toEqual([120,100,50]);
        });
        it('should convert blue to hsl', function() {
           expect('#0000ff'.toHSL()).toEqual([240,100,50]);
        });
        it('should convert #800 to hsl', function() {
           expect('#800'.toHSL()).toEqual([0, 100, 27]);
        });
        it('should convert #336699 to hsl', function() {
           expect('#336699'.toHSL()).toEqual([210,50,40]);
        });
    });

    describe('hslToHtmlColor', function() {
        it('should convert white to hsl and back', function() {
            var hsl = [0,0,100];
           expect(hslToHtmlColor.apply(null,hsl)).toEqual('#ffffff');
        });
        it('should convert black to hsl and back', function() {
            var hsl = [0,0,0];
           expect(hslToHtmlColor.apply(null,hsl).toHexColor()).toEqual('#000000');
        });
        it('should convert blue', function() {
            var hsl = [240, 100, 50];
           expect(hslToHtmlColor.apply(null,hsl).toHexColor()).toEqual('#0000ff');
        });
        it('should convert red', function() {
            var hsl = [0, 100, 25];
           expect(hslToHtmlColor.apply(null,hsl).toHexColor()).toMatch(/#800000/);
        });
    });

    describe('lighten', function() {
        it('should do nothing with zero', function() {
            expect('#800'.lighten(0)).toMatch(/#8[89a]0000/);
        });
        it('should set to white with 100', function() {
            expect('#800'.lighten(100)).toEqual('#ffffff');
        });
        it('should do nothing if already white', function() {
            expect('#fff'.lighten(20)).toEqual('#ffffff');
        });
        it('should lighten 20%', function() {
            expect('#880000'.lighten(20)).toEqual('#ee0000');
        });
    });
    describe('darken', function() {
        it('should do nothing with zero', function() {
            expect('#800'.darken(0)).toMatch(/#8[89a]0000/);
        });
        it('should set to black with 100', function() {
            expect('#800'.darken(100)).toEqual('#000000');
        });
        it('should do nothing if already black', function() {
            expect('#000'.darken(20)).toEqual('#000000');
        });
        it('should darken 20%', function() {
            expect('#880000'.darken(20)).toMatch(/#2[234]0000/);
        });
    });

    describe('saturate', function() {
        it('should do nothing with zero', function() {
            expect('#800'.saturate(0)).toMatch(/#8[789a]0000/);
        });
        it('should saturate(hsl(120, 30%, 90%), 20%) => hsl(120, 50%, 90%)', function() {
           expect(hslToHtmlColor(120, 30, 90).saturate(20)).toEqual('#D9F2D9')
        });
        it('should saturate(#855, 20%) => #9e3f3f', function() {
           expect("#855".saturate(20)).toMatch(/#9[de]3f3f/)
        });


        it('should saturate(#xxx, xxx%) => #yyy', function() {
           expect("#855".saturate(20)).toMatch(/#yyy/)
        });

        it('should saturate(#xxx, xxx%) => #d9f2d9', function() {
           expect("#855".saturate(20)).toMatch(/#d9f2d9/)
        });
        it('should saturate(#xxx, xxx%) => #9e3f3f', function() {
           expect("#855".saturate(20)).toMatch(/#9e3f3f/)
        })
        it('should saturate(#xxx, xxx%) => #000', function() {
           expect("#000".saturate(20)).toMatch(/#000000/)
        });
        it('should saturate(#fff, 20%) => #ffffff', function() {
           expect("#fff".saturate(20)).toMatch(/#ffffff/)
        });
        it('should saturate(#8a8%) => #33ff33', function() {
           expect("#8a8".saturate(100)).toMatch(/#33ff33/)
        });
        it('should saturate(#8a8%) => #88aa88', function() {
           expect("#8a8".saturate(0)).toMatch(/#88aa88/)
        });


        it('should saturate 120 30 90 to #e3e8e3', function() {
            expect(hslToHtmlColor(120, 30, 90).saturate(-20)).toMatch(/#e3e8e3/);
        });
        it('should saturate 855 to #726b6b', function() {
            expect('#855'.saturate(-20)).toMatch(/#726b6b/);
        });
        it('should saturate 000 to black', function() {
            expect('#000'.saturate(-20)).toMatch(/#00000/);
        });
        it('should saturate 000 to white', function() {
            expect('#fff'.saturate(-20)).toMatch(/#ffffff/);
        });
        it('should saturate 000 to white', function() {
            expect('#8a8'.saturate(-100)).toMatch(/#999999/);
        });
        it('should saturate 000 to white', function() {
            expect('#8a8'.saturate(0)).toMatch(/#88aa88/);
        });

        it('should desaturate(hsl(120, 30%, 90%), 20%) => hsl(120, 10%, 90%)', function() {
           expect(hslToHtmlColor(120, 30, 90).saturate(-20)).toEqual('#E3E8E3')
        });
        it('should desaturate(#855, 20%) => #726b6b', function() {
           expect("#855".saturate(-20)).toMatch(/#7[12]6[ab]6[ab]/)
        });

    });

});


//it('should saturate', function()  {
//  expect(evaluate("saturate(hsl(120, 30, 90), 20%)")).toEqual('#d9f2d9');
//  expect(evaluate("saturate(#855, 20%)")).toEqual('#9e3f3f');
//  assert_equal("black", evaluate("saturate(#000, 20%)"))
//  assert_equal("white", evaluate("saturate(#fff, 20%)"))
//  expect(evaluate("saturate(#8a8, 100%)")).toEqual('#33ff33');
//  expect(evaluate("saturate(#8a8, 0%)")).toEqual('#88aa88');
//  assert_equal("rgba(158, 63, 63, 0.5)", evaluate("saturate(rgba(136, 85, 85, 0.5), 20%)"))
//});
//
//it('should saturate_tests_bounds', function()  {
//  assert_error_message("Amount -0.001 must be between 0% and 100% for `saturate'",
//    "saturate(#123, -0.001)")
//  assert_error_message("Amount 100.001 must be between 0% and 100% for `saturate'",
//    "saturate(#123, 100.001)")
//});
//
//it('should saturate_tests_types', function()  {
//  assert_error_message("\"foo\" is not a color for `saturate'", "saturate(\"foo\", 10%)")
//  assert_error_message("\"foo\" is not a number for `saturate'", "saturate(#fff, \"foo\")")
//});
//
//it('should desaturate', function()  {
//  expect(evaluate("desaturate(hsl(120, 30, 90), 20%)")).toEqual('#e3e8e3');
//  expect(evaluate("desaturate(#855, 20%)")).toEqual('#726b6b');
//  assert_equal("black", evaluate("desaturate(#000, 20%)"))
//  assert_equal("white", evaluate("desaturate(#fff, 20%)"))
//  expect(evaluate("desaturate(#8a8, 100%)")).toEqual('#999999');
//  expect(evaluate("desaturate(#8a8, 0%)")).toEqual('#88aa88');
//  assert_equal("rgba(114, 107, 107, 0.5)", evaluate("desaturate(rgba(136, 85, 85, 0.5), 20%)"))
//});
//
//it('should desaturate_tests_bounds', function()  {
//  assert_error_message("Amount -0.001 must be between 0% and 100% for `desaturate'",
//    "desaturate(#123, -0.001)")
//  assert_error_message("Amount 100.001 must be between 0% and 100% for `desaturate'",
//    "desaturate(#123, 100.001)")
//});
//
//it('should desaturate_tests_types', function()  {
//  assert_error_message("\"foo\" is not a color for `desaturate'", "desaturate(\"foo\", 10%)")
//  assert_error_message("\"foo\" is not a number for `desaturate'", "desaturate(#fff, \"foo\")")
//});
//
//it('should adjust_hue', function()  {
//  expect(evaluate("adjust-hue(hsl(120, 30, 90), 60deg)")).toEqual('#deeded');
//  expect(evaluate("adjust-hue(hsl(120, 30, 90), -60deg)")).toEqual('#ededde');
//  expect(evaluate("adjust-hue(#811, 45deg)")).toEqual('#886a11');
//  assert_equal("black", evaluate("adjust-hue(#000, 45deg)"))
//  assert_equal("white", evaluate("adjust-hue(#fff, 45deg)"))
//  expect(evaluate("adjust-hue(#8a8, 360deg)")).toEqual('#88aa88');
//  expect(evaluate("adjust-hue(#8a8, 0deg)")).toEqual('#88aa88');
//  assert_equal("rgba(136, 106, 17, 0.5)", evaluate("adjust-hue(rgba(136, 17, 17, 0.5), 45deg)"))
//});
//
//it('should adjust_hue_tests_types', function()  {
//  assert_error_message("\"foo\" is not a color for `adjust-hue'", "adjust-hue(\"foo\", 10%)")
//  assert_error_message("\"foo\" is not a number for `adjust-hue'", "adjust-hue(#fff, \"foo\")")
//});
//
//it('should mix', function()  {
//  expect(evaluate("mix(#f00, #00f)")).toEqual('#7f007f');
//  expect(evaluate("mix(#f00, #0ff)")).toEqual('#7f7f7f');
//  expect(evaluate("mix(#f70, #0aa)")).toEqual('#7f9055');
//  expect(evaluate("mix(#f00, #00f, 25%)")).toEqual('#3f00bf');
//  assert_equal("rgba(63, 0, 191, 0.75)", evaluate("mix(rgba(255, 0, 0, 0.5), #00f)"))
//  assert_equal("red", evaluate("mix(#f00, #00f, 100%)"))
//  assert_equal("blue", evaluate("mix(#f00, #00f, 0%)"))
//  assert_equal("rgba(255, 0, 0, 0.5)", evaluate("mix(#f00, transparentize(#00f, 1))"))
//  assert_equal("rgba(0, 0, 255, 0.5)", evaluate("mix(transparentize(#f00, 1), #00f)"))
//  assert_equal("red", evaluate("mix(#f00, transparentize(#00f, 1), 100%)"))
//  assert_equal("blue", evaluate("mix(transparentize(#f00, 1), #00f, 0%)"))
//  assert_equal("rgba(0, 0, 255, 0)", evaluate("mix(#f00, transparentize(#00f, 1), 0%)"))
//  assert_equal("rgba(255, 0, 0, 0)", evaluate("mix(transparentize(#f00, 1), #00f, 100%)"))
//});
//
//it('should mix_tests_types', function()  {
//  assert_error_message("\"foo\" is not a color for `mix'", "mix(\"foo\", #f00, 10%)")
//  assert_error_message("\"foo\" is not a color for `mix'", "mix(#f00, \"foo\", 10%)")
//  assert_error_message("\"foo\" is not a number for `mix'", "mix(#f00, #baf, \"foo\")")
//});
//
//it('should mix_tests_bounds', function()  {
//  assert_error_message("Weight -0.001 must be between 0% and 100% for `mix'",
//    "mix(#123, #456, -0.001)")
//  assert_error_message("Weight 100.001 must be between 0% and 100% for `mix'",
//    "mix(#123, #456, 100.001)")
//});
//
//it('should grayscale', function()  {
//  expect(evaluate("grayscale(#abc)")).toEqual('#bbbbbb');
//  assert_equal("gray", evaluate("grayscale(#f00)"))
//  assert_equal("gray", evaluate("grayscale(#00f)"))
//  assert_equal("white", evaluate("grayscale(white)"))
//  assert_equal("black", evaluate("grayscale(black)"))
//});
//
//def tets_grayscale_tests_types
//  assert_error_message("\"foo\" is not a color for `grayscale'", "grayscale(\"foo\")")
//});
//
//it('should complement', function()  {
//  expect(evaluate("complement(#abc)")).toEqual('#ccbbaa');
//  assert_equal("aqua", evaluate("complement(red)"))
//  assert_equal("red", evaluate("complement(aqua)"))
//  assert_equal("white", evaluate("complement(white)"))
//  assert_equal("black", evaluate("complement(black)"))
//});
//
//def tets_complement_tests_types
//  assert_error_message("\"foo\" is not a color for `complement'", "complement(\"foo\")")
//});
//