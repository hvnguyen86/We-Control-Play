package controllers;

import play.*;
import play.mvc.*;
import sun.misc.BASE64Encoder;

import java.util.*;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.*;
import models.*;

public class Application extends Controller {
	
    public static void index() {
    	
        render();
    }
    //test
    public static void controller(String id){
    	
    	String host = getHost();
    	render(id);
 
 
    }
    
    
    public static void generateId(){
    	byte[] bytes = new byte[20];
    	new Random().nextBytes(bytes);
    	String rand = new BASE64Encoder().encode(bytes).replace('/', '_').replace('+', '-').replace('=', '_');
 
    	renderHtml(rand);
    }
    
    public static String getHost(){
    	String ip;
		try {
			ip = InetAddress.getLocalHost().getHostAddress();
	    	return ip+":9000";
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			
			e.printStackTrace();
			return "localhost:9000";
			
		}
    	
    }

}

