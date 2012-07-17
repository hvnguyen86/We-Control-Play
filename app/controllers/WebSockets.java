package controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import play.mvc.Http.Outbound;
import play.mvc.Http.WebSocketClose;
import play.mvc.Http.WebSocketEvent;
import play.mvc.Http.WebSocketFrame;
import play.mvc.WebSocketController;

public class WebSockets extends WebSocketController {
	
	public static HashMap hm = new HashMap();
	
	public static void application(String id){
		
		hm.put(id, outbound);
		while(inbound.isOpen()){
			WebSocketEvent e = await(inbound.nextEvent());
			if(e instanceof WebSocketFrame){
				WebSocketFrame frame = (WebSocketFrame) e;
				if(frame.textData.equals("quit")){
					outbound.send("Bye");
					disconnect();
					
				}
			}
			if( e instanceof WebSocketClose){
				hm.remove(id);
			}
		}
		
		
	}
	
	
	public static void controller(String id){
		
		if (hm.containsKey(id)) {
			Outbound app = (Outbound) hm.get(id);
			while (inbound.isOpen()) {
				WebSocketEvent e = await(inbound.nextEvent());
				if (e instanceof WebSocketFrame) {
					WebSocketFrame frame = (WebSocketFrame) e;

					if (!((WebSocketFrame) e).isBinary) {
						if (frame.textData.equals("quit")) {
							outbound.send("Bye");
							disconnect();
						} else {
							app.send(frame.textData);
						}
					}
				}
				if (e instanceof WebSocketClose) {

				}
			}
		}
	}
	
	
	
}
