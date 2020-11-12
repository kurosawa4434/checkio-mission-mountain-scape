//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function mountainScapeVisualization(tgt_node, data) {

            if (! data || ! data.ext) {
                return
            }

            const input = data.in
            const explanation = data.ext.explanation
            const answer = data.ext.answer

            /*----------------------------------------------*
             *
             * attr
             *
             *----------------------------------------------*/
            const attr = {
                number_scale: {
                    'font-size': '10px',
                },
                background: {
                    'stroke-width': '0px',
                    'fill': '#dfe8f7',
                },
                axis: {
                    'stroke-width': '1px',
                    'stroke': '#294270',
                    'arrow-end': 'block-wide-long',
                },
                triangle: {
                    'stroke-width': '1px',
                    'stroke': 'orange',
                    'fill': '#FABA00',
                    'opacity': 0.45,
                },
                grid: {
                    'stroke-width': '0.5px',
                    'stroke': '#82D1F5',
                },
            };


            /*----------------------------------------------*
             *
             * values
             *
             *----------------------------------------------*/
            let min_x = 100
            let max_x = -100
            input.forEach(([x, y])=>{
                min_x = Math.min(0, x-y < min_x ? x-y : min_x)
                max_x = x+y > max_x ? x+y : max_x
            })
            const width = max_x - min_x
            const height = width / 2
            const offset = min_x < 0 ? -min_x : 0
            const max_height = 10
            const grid_size_px = 300
            const unit = grid_size_px / (width)
            const ov = 13
            const oh = 5

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            const paper = Raphael(tgt_node, grid_size_px+oh, height*unit+ov, 0, 0)

            /*----------------------------------------------*
             *
             * draw rect
             *
             *----------------------------------------------*/
            // rect
            paper.rect(0+oh, 0, grid_size_px, height*unit).attr(attr.background)

            /*----------------------------------------------*
             *
             * draw grid
             *
             *----------------------------------------------*/
            attr.grid['stroke-width'] = Math.min(0.5, 0.5 * 10 / width)

            for (let i = -1; i < width; i += 1) {
                paper.path([
                    'M', (i*2-(height % 2))*unit+oh, 0,
                    'l', -height*unit,  height*unit
                ]).attr(attr.grid)
            }

            for (let i = width; i > -(height/2); i -= 1) {
                paper.path([
                    'M', (i*2-(height % 2))*unit+oh, 0,
                    'l', height*unit,   height*unit,
                ]).attr(attr.grid)
            }

            for (let i = 1; i < height; i += 1) {
                paper.path([
                    'M', oh, i*unit,
                    'h', (width+offset) * unit,
                ]).attr(attr.grid)
            }

            /*----------------------------------------------*
             *
             * draw triangle
             *
             *----------------------------------------------*/
            function draw_triagle(x, y) {
                const top = (height - y) * unit
                paper.path(['M', (x+offset)*unit+oh, top,
                            'l', y*unit, y*unit,
                            'l', y*unit*-2, 0,
                            'z']
                ).attr(attr.triangle)
//                paper.text((x+offset)*unit+oh, top-10, '(' + x + ', ' + y + ')')
            }

            input.forEach(([x, y])=>{
                draw_triagle(x, y)
            })

            /*----------------------------------------------*
             *
             * draw axis
             *
             *----------------------------------------------*/
            paper.path([
                'M', offset*unit+oh, height*unit,
                'v', -height*unit+3,
            ]).attr(attr.axis)

            paper.path([
                'M', 0+oh, height*unit,
                'h', width*unit-3,
            ]).attr(attr.axis)

            paper.text(offset*unit+ov/3+oh, height*unit+ov/1.5, 0).attr(attr.number_scale)
        }

        var $tryit;

        var io = new extIO({
            multipleArguments: false,
            functions: {
                python: 'mountain_scape',
                js: 'mountainScape'
            },
            animation: function($expl, data){
                mountainScapeVisualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
