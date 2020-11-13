    
function project(){
    var angle = $("#angl").val();
    angle=angle*(Math.PI)/180;

    var v= $("#vel").val();
    vx=v*(Math.cos(angle)); 
    vy=-v*(Math.sin(angle));





    // module aliases
var Engine = Matter.Engine,
        Events = Matter.Events,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Vector = Matter.Vector;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1500,
        
        background : '#0f0f13'
    }
});

// create two bodies and a ground
// var boxA = Bodies.rectangle(200, 600, 40, 40);
var ball = Bodies.circle(50,600, 30 , {friction: 0, frictionAir:0, restitution: 1 });
var ground = Bodies.rectangle(400, 610, 2000, 60, { isStatic: true });

engine.world.gravity.y = 1;


Matter.Body.setVelocity(ball, {x:vx , y:vy});


// add all of the bodies to the world
World.add(engine.world, [ground, ball]);





//add trail



    var trail = [];

    Events.on(render, 'afterRender', function() {
        trail.unshift({
            position: Vector.clone(ball.position),
            speed: ball.speed
        });

        Render.startViewTransform(render);
        render.context.globalAlpha = 0.7;

        for (var i = 0; i < trail.length; i += 1) {
            var point = trail[i].position,
                speed = trail[i].speed;
            
            var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
            render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
            render.context.fillRect(point.x, point.y, 2, 2);
        }

        render.context.globalAlpha = 1;
        Render.endViewTransform(render);

        if (trail.length > 2000) {
            trail.pop();
        }
    });


 // add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

World.add(engine.world, mouseConstraint);

render.mouse = mouse;

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

}