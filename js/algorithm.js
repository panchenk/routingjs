$(document).ready(function()
{
    var mode = "hubs_not_selected";
    var hubs_waiting_to_be_selected = 0;


    $( "td" ).on( "click", function( event )
    {
        if(hubs_waiting_to_be_selected > 0)
        {
            // alert("that will be a new hub");
            // $( "#1" ).addClass( "selecting-hub" );
            var id = $(this).attr('id');
            $("#" + id).addClass('selecting-hub');


            hubs_waiting_to_be_selected--;


            //when all the hubs are already selected
            if(!hubs_waiting_to_be_selected)
            {
                $('td').css( 'cursor', 'auto' );
            }
        }
    });


    function node() 
    {
        this.west = 0;
        this.north = 0;
        this.east = 0;
        this.south = 0;
        this.value = 0;
    }

    $("#inlineFormCustomSelect").on
    (
        'change', function()
        {

            hubs_waiting_to_be_selected = this.value;
            if(mode == "hubs_not_selected")
            {
                $('td').css( 'cursor', 'pointer' );
                // $("td").mouseover(function(){
                $('td').hover
                (
                    function()
                    {
                        if(hubs_waiting_to_be_selected > 0)
                        $(this).toggleClass('selecting-hub');
                    }
                );

            }
            else
            {

            }
        }
    );

    $( "#onSimulate" ).on( "click", function( event ) 
    {
        event.preventDefault();
        console.log("Running the simulation!");

         const height = 10; 
         const length = 10; 
         var i = x = y = count = path = j = 0;
         var af = xf = yf = 0.0;
        //  var j = 0;

        var nodes = new Array();
        for (i = 0; i < height*length; i++)
        {
            nodes.push(new node());
        }

        

        for (i=0; i<height; i++)
        {
            for (j=0; j<length; j++)
            {
                 
                //1st quarter
                if ((j<=(length%2==0 ? Math.floor(length/2) : Math.floor(length/2))) && (i<=(height%2==0 ? Math.floor(height/2-1) : Math.floor(height/2-1))))
                {
                    nodes[y*length+x].value = i*length + j;
                    x = j;
                    y = i;
                    af = (y)/(x);
                    path = y + x;
                    while (path>0)
                    {
                        yf = af*(x);
                        xf = (y)/af;
                        if (((j>=i)&(y-yf<0.5))||((i>j)&(x-xf>0.5)))
                        {
                            //table[nodes[y*length+x].value][nodes[i*length+j].value] = 1;
                            nodes[y*length+x].west++;
                            nodes[y*length+x-1].east++;
                            x--;
                        }
                        else
                        {
                            //table[nodes[y*length+x].value][nodes[i*length+j].value] = 2;
                            nodes[y*length+x].north++;
                            nodes[(y-1)*length+x].south++;
                            y--;
                        }
                        path--;
                    }
                }
                //2nd quarter
                if ((j>=(length%2==0 ? Math.floor(length/2+1) : Math.floor(length/2+1))) && (i<=(height%2==0 ? Math.floor(height/2-1) : Math.floor(height/2))))
                {

                    x = j;
                    y = i;
                    af = (y)/(length-x);
                    path = y+length-x;
                    while (path>0)
                    {
                        yf = af*(length-x);
                        xf = length-(y)/af;
                        if (((i>=length-j)&(y-yf<0.5))||((i<length-j)&(y-yf<-0.5)))
                        {
                            if (x==length-1)
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                nodes[y*length+x].east++;
                                x=0;
                                nodes[y*length+x].west++;
                            }
                            else if (x==0)
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 2;
                                nodes[y*length+x].north++;
                                nodes[(y-1)*length+x].south++;
                                y--;
                            }
                            else
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                nodes[y*length+x].east++;
                                nodes[y*length+x+1].west++;
                                x++;
                            }
                        }
                        else
                        {
                            if(y==0)
                            {
                                if (x==length-1)
                                {
                                    //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                    nodes[y*length+x].east++;
                                    x=0;
                                    nodes[y*length+x].west++;
                                }
                                else
                                {
                                    //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                    nodes[y*length+x].east++;
                                    nodes[y*length+x+1].west++;
                                    x++;
                                }
                            }
                            else
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 2;
                                nodes[y*length+x].north++;
                                nodes[(y-1)*length+x].south++;
                                y--;
                            }
                        }
                        path--;
                    }
                }
                //3rd quarter
                if ((j>=(length%2==0 ? Math.floor(length/2) : Math.floor(length/2+1))) && (i>=(height%2==0 ? Math.floor(height/2) : Math.floor(height/2+1))))
                {
                    x = j;
                    y = i;
                    af = (y)/(x);
                    path = height-y+length-x;
                    while (path>0)
                    {
                        yf = af*(x);
                        xf = (y)/af;
                        if(((i>j)&(yf-y<0.5))||((i<=j)&(yf-y<-0.5)))
                        {
                        //if ((yf-y<0.5)) {
                            if (x==length-1)
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                nodes[y*length+x].east++;
                                x=0;
                                nodes[y*length+x].west++;
                            }
                            else if (x==0)
                            {
                                if (y==height-1)
                                {
                                    //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                                    nodes[y*length+x].south++;
                                    y=0;
                                    nodes[y*length+x].north++;
                                }
                                else
                                {
                                    //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                                    nodes[y*length+x].south++;
                                    nodes[(y+1)*length+x].north++;
                                    y++;
                                }
                            }
                            else
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                nodes[y*length+x].east++;
                                nodes[y*length+x+1].west++;
                                x++;
                            }
                        }
                        else if (y==height-1)
                        {
                            //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                            nodes[y*length+x].south++;
                            y=0;
                            nodes[y*length+x].north++;
                        }
                        else if (y==0)
                        {
                            if ((x==length-1))
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                nodes[y*length+x].east++;
                                x=0;
                                nodes[y*length+x].west++;
                            }
                            else
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 3;
                                nodes[y*length+x].east++;
                                nodes[y*length+x+1].west++;
                                x++;
                            }
                        }

                        else
                        {
                            //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                            nodes[y*length+x].south++;
                            nodes[(y+1)*length+x].north++;
                            y++;
                        }
                        path--;
                    }
                }
                //4th quarter
                if ((j<=(length%2==0 ? Math.floor(length/2-1) : Math.floor(length/2))) && (i>=(height%2==0 ? Math.floor(height/2) : Math.floor(height/2))))
                {
                    x = j;
                    y = i;
                    af = (height-y)/(x);
                    path = height-y+x;
                    while (path>0)
                    {
                        yf = height-af*(x);
                        xf = (height-y)/af;
                        if (((height-i<j)&(yf-y<0.5))||((height-i>=j)&(yf-y<-0.5)))
                        {
                            if (x==0)
                            {
                                if (y==height-1)
                                {
                                    //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                                    nodes[y*length+x].south++;
                                    y=0;
                                    nodes[y*length+x].north++;
                                }
                                else
                                {
                                    //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                                    nodes[y*length+x].south++;
                                    nodes[(y+1)*length+x].north++;
                                    y++;
                                }
                            }
                            else
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 1;
                                nodes[y*length+x].west++;
                                nodes[y*length+x-1].east++;
                                x--;
                            }
                        }
                        else
                        {
                            if (y==height-1)
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                                nodes[y*length+x].south++;
                                y=0;
                                nodes[y*length+x].north++;
                            }
                            else if (y==0)
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 1;
                                nodes[y*length+x].west++;
                                nodes[y*length+x-1].east++;
                                x--;
                            }
                            else
                            {
                                //table[nodes[y*length+x].value][nodes[i*length+j].value] = 4;
                                nodes[y*length+x].south++;
                                nodes[(y+1)*length+x].north++;
                                y++;
                            }
                        }
                        path--;
                    }
                }
            }
        }

        console.log(nodes);

        // display calculated values
        for(i = 0; i < height*length; i++)
        {
            $( "#" + i ).html( "w:" + nodes[i].west + " n:" + nodes[i].north + " e:" + nodes[i].east + " s:" + nodes[i].south);
        }
        

        
        

    });

    console.log("hello world!");
});